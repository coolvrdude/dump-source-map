const fs = require('fs');
const mkdirp = require('mkdirp');
const path = require('path');
const { SourceMapConsumer } = require('source-map');

if (process.argv.length < 3) {
  console.log('usage: node . [file path to source map] [output directory (default: output)]')
  return -1;
}

const filePath = process.argv[2];
const outputDir = process.argv[3] || 'output';
const sourceMapData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

SourceMapConsumer.with(sourceMapData, null, async consumer => {
  let fileCount = 0;

  // iterate through each original source file
  for (let i = 0, l = consumer.sources.length; i < l; i++) {
    var sourcePath = consumer.sources[i];
	var isFlagged = false; // Flag file for weird path name
	
	
    if (sourcePath.includes('://')) {
		isFlagged = true;
      //console.error(`skipping ${sourcePath}`);
      //sourcePath = sourcePath.replace("://", "/");
	  //continue;
    }

    // parse the source path and generate output path
    const { dir, base } = path.parse(sourcePath.replace("://", "/")); // nvm about the flag but it'll just ignore it if it doesnt exist so works ig
	
	// basically it tries to create a path with "://" in the path name so this is just a hack to fix it
	
	
	/*
	* i guess if you wanted to use the flag you could do this 
	* if (isFlagged){
		const { dir, base } = path.parse(sourcePath.replace("://", "/"));
	} else {
		const { dir, base } = path.parse(sourcePath));
	}
	* but isn't that a bit excessive? idk 
	*/
	
	
    const sourceOutputDir = path.join(outputDir, dir);
    const sourceOutputPath = path.join(sourceOutputDir, base);
    
    // ensure directories exist for output path
    await mkdirp(sourceOutputDir);

    // write original code
    fs.writeFileSync(sourceOutputPath, consumer.sourceContentFor(sourcePath));
    fileCount++;
  }

  console.log(`extracted ${fileCount} source file(s)`);
});
