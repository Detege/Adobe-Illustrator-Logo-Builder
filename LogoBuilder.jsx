/**********************************************************
 
 LogoBuilder.jsx V.3.0 - Demo
 
 DESCRIPTION: 
 Creates all assets for the ACME sub-product logos

 Daniel Terol
 V1.1 06/24/2020
 v1.2 07/06/2020 - Unchecked 'Include CMYK PostScript in RGB files' for RGB EPS export options.
 v2.0 10/06/2020 - Aurora Update: {
     Implemented Aurora style: fonts, colors and new sub-product logo guidelines.
     Set the kerning to Optical, -20 for the names, and Optical, 0 for the beta tags.
     Added a new white version with the name set in A11y Blue.
     Checks if there is two words before sizing the name down, and splits it into two lines when the first word is longer than the second one.
     Removed the function that prevented the script to export the stacked versions when the name was too long.
     Added a warning message at the end that gets triggered if the name is too long.
     Adjusted the naming of the folders and files created to comply with the new guidelines.
     Tidy up the dialog box at the begging of the script.
 }
 v2.1 01/22/21 - Removed to lowercase function to allow for localization needs.
 v3.0 01/28/21 - Updated the font and colors to the latest guidelines. NEED TO SET CMYK COLORS
 
 **********************************************************/


var artbSpacing = 550.0;
var logoHeight = 322.0;
var logoWidth = 1200;
var artbDistance = artbSpacing + logoHeight;
var betaSpace = 10; // Space between the name and the beta tag
var folderPath;
var productName;
var betaTag;
var myFont = app.textFonts.getByName('HelveticaNeue'); // Sets the font for the names
var nameLeading = 200
var ACMEBlue;
var darkInk;
var ACMEWhite;
var A11yButtonBlue;
var betaGrey;
var nameTooLong = false;
var thisFile = new File($.fileName);
var basePath = thisFile.path;

function topLeftCorner(n){
    return logoHeight - (artbDistance * n);
}

for(var y = 0; y < 2; y++){ 
    // Creates new document with 4 artboards
    if(y == 0){ 
        var myDoc = app.documents.add(
            DocumentColorSpace.RGB, 
            logoWidth, 
            logoHeight, 
            6, // Sets the # of artboards
            DocumentArtboardLayout.Column, // Sets the artboards on a single column
            artbSpacing); 

        // Prompts for the product name and beta tag 
        var dlg = new Window( 'dialog', 'ACME Logo Builder' );
        dlg.preferredSize.width = 500; 
        dlg.alignChildren = ['center','top'];

        dlg.headerGroup = dlg.add('group', undefined,);
        dlg.headerGroup.orientation = 'row';


        var LogoDialogBox = File (basePath + '/LogoDialogBox.png');
        var image1 = dlg.headerGroup.add('image', undefined, File.decode(LogoDialogBox), {name: 'image1'}); 
        dlg.headerGroup.versionNo = dlg.headerGroup.add( 'statictext', undefined, 'Version 2.1' );
        dlg.headerGroup.width = 440;
        dlg.headerGroup.spacing = 121; 

        dlg.spacer = dlg.add( 'group', undefined,);
        dlg.spacer.preferredSize.height = 5;

        dlg.msgPnl = dlg.add( 'group', undefined,);
        dlg.msgPnl.orientation = 'column';
        dlg.msgPnl.preferredSize.width = 440;
        dlg.msgPnl.titleSt = dlg.msgPnl.add( 'statictext', undefined, 'Enter the product name:' );
        dlg.msgPnl.titleSt.preferredSize.width = 440;
        dlg.msgPnl.titleEt = dlg.msgPnl.add( 'edittext', undefined, 'product name' );
        dlg.msgPnl.titleEt.preferredSize.width = 440;
        
        dlg.hasBtnsCb = dlg.add( 'checkbox', undefined, 'Should there be a Beta tag?' );
        dlg.hasBtnsCb.preferredSize.width = 440;
        dlg.hasBtnsCb.value = false;
        
        dlg.btnPnl = dlg.add( 'group', undefined,);
        dlg.btnPnl.preferredSize.width = 440;
        dlg.btnPnl.orientation = 'row';
        dlg.btnPnl.alignChildren = ['right','top']; 
        dlg.btnPnl.buildBtn = dlg.btnPnl.add( 'button', undefined, 'Build it', { name: 'ok' } );
        dlg.btnPnl.buildBtn.preferredSize.width = 119;
        //dlg.btnPnl.cancelBtn = dlg.btnPnl.add( 'button', undefined, 'Cancel', { name: 'cancel' } ); // TODO this doesn't actually cancel
        dlg.show();

        productName = dlg.msgPnl.titleEt.text;
        //productName = productName.toLowerCase();

        betaTag = dlg.hasBtnsCb.value; 
    
        // Prompts for the folder location
        folder = Folder.myDocuments;
    
        folderPath = folder.selectDlg('Where do you want the new logos saved?');
        folderPath += '/';
         
        
        // Sets the colors for RGB versions
        darkInk = new RGBColor();
        darkInk.red = 0;
        darkInk.green = 28;
        darkInk.blue = 64;

        ACMEBlue = new RGBColor();
        ACMEBlue.red = 0;
        ACMEBlue.green = 58;
        ACMEBlue.blue = 155;

        ACMEWhite = new RGBColor();
        ACMEWhite.red = 255;
        ACMEWhite.green = 255;
        ACMEWhite.blue = 255;

        A11yButtonBlue = new RGBColor();
        A11yButtonBlue.red = 103;
        A11yButtonBlue.green = 146;
        A11yButtonBlue.blue = 240;

        betaGrey = new RGBColor();
        betaGrey.red = 152;
        betaGrey.green = 152;
        betaGrey.blue = 152;

    }else{
        var myDoc = app.documents.add(
            DocumentColorSpace.CMYK, 
            logoWidth, 
            logoHeight, 
            6, 
            DocumentArtboardLayout.Column,
            artbSpacing); 

        // Sets the colors for CMYK versions
        darkInk = new CMYKColor();
        darkInk.cyan = 43;
        darkInk.magenta = 35;
        darkInk.yellow = 35;
        darkInk.black = 1;

        ACMEBlue = new CMYKColor();
        ACMEBlue.cyan = 43;
        ACMEBlue.magenta = 35;
        ACMEBlue.yellow = 35;
        ACMEBlue.black = 1;

        A11yButtonBlue = new CMYKColor();
        A11yButtonBlue.cyan = 78;
        A11yButtonBlue.magenta = 25;
        A11yButtonBlue.yellow = 0;
        A11yButtonBlue.black = 0;

        ACMEWhite = new CMYKColor();
        ACMEWhite.cyan = 0;
        ACMEWhite.magenta = 0;
        ACMEWhite.yellow = 0;
        ACMEWhite.black = 0;

        betaGrey = new CMYKColor();
        betaGrey.cyan = 43;
        betaGrey.magenta = 35;
        betaGrey.yellow = 35;
        betaGrey.black = 1;
    }
    // Places all ACME logos
    for (var i=0; i<myDoc.artboards.length; i++){
        
        // Creates new group to place the logo and product name in
        var newGroup = myDoc.groupItems.add();
        var val = 6 - i;
        newGroup.name = 'parentGroup' + val;

        // Places either the color or white version of the logo
        var svgLogoColor = File (basePath + '/myLogo.svg');
        var newLogo = newGroup.groupItems.createFromFile(svgLogoColor);

        // Names the logo objects
        newLogo.name = 'logoGroup' + val;

        // Sets the placement of the logos
        newLogo.left = 0.0;
        newLogo.top = topLeftCorner(i);

        // Places the product names
        var newName = newGroup.textFrames.add();
        newName.contents = productName; 
        var textStyle = newName.textRange.characterAttributes;
        textStyle.textFont = myFont;
        textStyle.kerningMethod = AutoKernType.OPTICAL;
        textStyle.tracking = -20;
        textStyle.autoLeading = false;
        textStyle.leading = nameLeading;

        // Creates the beta tag if needed
        if(betaTag == true){
            var newBeta = newGroup.textFrames.add();
            newBeta.contents = 'beta'; 
            var betaStyle = newBeta.textRange.characterAttributes;
            betaStyle.textFont = myFont;
            betaStyle.kerningMethod = AutoKernType.OPTICAL;
        }

        // Sets the colors. Orange or White Updated: It just for the Beta tags
        if(i<2){
            if(betaTag == true){
                betaStyle.fillColor = betaGrey;
            }
        }else{
            if(betaTag == true){
                betaStyle.fillColor = ACMEWhite;
            }
        }
        
        // Sets the position and font size of the newName
        if(!( i & 1 )){ // Horizontal verisons
            textStyle.size = 225;   
            newName.top = topLeftCorner(i) - logoHeight + 193;
            newName.left = 1269.0;  
            
            if(betaTag == true){
                betaStyle.size = 95;        
                var betaPos = newName.width + betaSpace;
                newBeta.top = topLeftCorner(i) - logoHeight + 196;
                newBeta.left = 1293.0 + betaPos;
                newBeta.selected = true; 
                app.executeMenuCommand('outline');  
            }
        }else{ // Stacked versions
            var vertCorrection = -31;
            textStyle.size = 196;
            newName.textRange.justification = Justification.RIGHT;
            var stackedName = productName;
            var indexOfSpace = productName.indexOf(' ');
            
            
            // If there is more than one word, moves the second one to a new line
            if(indexOfSpace !== -1 & newName.width > 878 & indexOfSpace * 2 >= productName.length - 1 & productName.length > 12) {
                stackedName = productName.replace(' ','\n ');
                newName.contents = stackedName;
            }

            function resize(n){
                newName.height -= newName.height / (newName.width / n);
                newName.width -= n;
                newName.left += n;
            }
                       
            // Sizes the text frame of the longer names accordingly
            // 878 is the size limit for longer names.
            if (newName.width > 878 & newName.width < 1145){  
                var difference = newName.width - 890;
                //var newLeading = nameLeading * (1 - (890 / newName.width) + 1);
                //textStyle.leading = newLeading;
                resize(difference);
            }else if (newName.width > 878){
                var difference = newName.width - 890;
                //var newLeading = nameLeading * (1 - (890 / newName.width) + 1);
                //textStyle.leading = newLeading;
                resize(difference);
                nameTooLong = true; 
            }

            // Places the names correctly
            newName.top = topLeftCorner(i) - logoHeight + vertCorrection;
            newName.left = logoWidth - newName.width;    
            
            if(betaTag == true){
                betaStyle.size = 86;
                newBeta.top = topLeftCorner(i) - logoHeight - 27;
                newBeta.left = 1247.0;
                newBeta.selected = true; 
                app.executeMenuCommand('outline');    
            }   
        }
        
        // Selects, outlines and names the product names of the logos
        newName.selected = true;
        app.executeMenuCommand('outline'); 
        if(betaTag == true){
            myDoc.groupItems[2].name = 'nameGroup' + val;
        }else{myDoc.groupItems[1].name = 'nameGroup' + val;
        }
    }

    function logoFillColor(target, col){
        for (var i = 0; i < target.pathItems.length; i++){
            target.pathItems[i].fillColor = col;
        }
        for (var i = 0; i < target.compoundPathItems.length; i++){
            target.compoundPathItems[i].pathItems[0].fillColor = col;
        }
    }

    var logo1 = myDoc.groupItems.logoGroup1;
    var logo2 = myDoc.groupItems.logoGroup2;
    var logo3 = myDoc.groupItems.logoGroup3;
    var logo4 = myDoc.groupItems.logoGroup4;
    var logo5 = myDoc.groupItems.logoGroup5;
    var logo6 = myDoc.groupItems.logoGroup6;
    logoFillColor(logo1, ACMEWhite);
    logoFillColor(logo2, ACMEWhite);
    logoFillColor(logo3, ACMEWhite);
    logoFillColor(logo4, ACMEWhite);
    logoFillColor(logo5, ACMEBlue);
    logoFillColor(logo6, ACMEBlue);

    // Changes the orange of the text to CMYK
    function textFillColor(target, col){
        for (var i = 0; i < target.compoundPathItems.length; i++){
            target.compoundPathItems[i].pathItems[0].fillColor = col;
        }
    }

    var name1 = myDoc.groupItems.nameGroup1;
    var name3 = myDoc.groupItems.nameGroup3;
    var name2 = myDoc.groupItems.nameGroup2;
    var name4 = myDoc.groupItems.nameGroup4;
    var name5 = myDoc.groupItems.nameGroup5;
    var name6 = myDoc.groupItems.nameGroup6;
    textFillColor(name1, A11yButtonBlue);
    textFillColor(name2, A11yButtonBlue);
    textFillColor(name3, ACMEWhite);
    textFillColor(name4, ACMEWhite);
    textFillColor(name5, darkInk);
    textFillColor(name6, darkInk);

    // Adjusts the position of the stacked names after outlining the text
    var nameWidht = myDoc.groupItems.nameGroup1.width;
    myDoc.groupItems.nameGroup1.left = logoWidth - nameWidht;
    myDoc.groupItems.nameGroup3.left = logoWidth - nameWidht;
    myDoc.groupItems.nameGroup5.left = logoWidth - nameWidht;

    // Resizes the artboards
    if (app.documents.length > 0) {  
            
        try {
            
            
            for (i=0, ii=3; i<myDoc.artboards.length; i++,ii--) {
                if(!( i & 1 )){
                    var myGroup = myDoc.groupItems.parentGroup2.geometricBounds;                
                }else{
                    var myGroup = myDoc.groupItems.parentGroup1.geometricBounds;
                    }
                
                var mytWidth = myGroup[2];
                mytWidth = Math.ceil(mytWidth);
                var myHeight = (myGroup[3] - myGroup[1]) * -1;
                myHeight = Math.ceil(myHeight);
                
                var abBounds = myDoc.artboards[i].artboardRect;
                
                var ableft = abBounds[0];
                var abtop = abBounds[1];
                if(i==0){
                //alert('width = ' + mytWidth + ' height = ' + myHeight);
                }
                var abright = ableft + mytWidth;
                var abbottom = abtop - myHeight;
                
                myDoc.artboards[i].artboardRect = [ableft, abtop, abright, abbottom];

                myGroup.selected = false; 
            }
        }
        catch(e) {
        }
    }  
    else  {  
        alert ('there are no open documents');  
    } 

    myDoc.activeLayer.hasSelectedArtwork = false;

    // Renames the artboards
    function arbRename(names){
        for (var i=0; i<names.length; i++){
            myDoc.artboards[i].name = names[i];
        }
    }
    var artNameRGB = [
        'Logo_RGB_COLOR_Horizontal',
        'Logo_RGB_COLOR_Stacked',
        'Logo_RGB_WHITE_Horizontal',
        'Logo_RGB_WHITE_Stacked',
        'Logo_RGB_A11Y_Horizontal',
        'Logo_RGB_A11Y_Stacked'
    ];
    var artNameCMKY = [
        'Logo_CMYK_COLOR_Horizontal',
        'Logo_CMYK_COLOR_Stacked',
        'Logo_CMYK_WHITE_Horizontal',
        'Logo_CMYK_WHITE_Stacked',
        'Logo_CMYK_A11Y_Horizontal',
        'Logo_CMYK_A11Y_Stacked'
    ];

    if(y == 0){
        arbRename(artNameRGB);
    }else{
        arbRename(artNameCMKY);
    }

    // Saves the final files
    function exportFileAsEPS(destFile, n ) {
        var newFile = new File(destFile);
        var saveDoc;
        if (app.documents.length == 0) {
            saveDoc = app.documents.add();
        } else {
            saveDoc = myDoc;
        }
        
        var saveOpts = new EPSSaveOptions();
        saveOpts.saveMultipleArtboards = true;
        saveOpts.artboardRange = '1-6';        
        
        if(y==0){
            saveOpts.cmykPostScript = false;
        }
        
        saveDoc.saveAs(newFile, saveOpts);
    }

    function saveFileAsPNG(destFile, n) {
        var newFile = new File(destFile);
        var saveDoc;
        if (app.documents.length == 0) {
            saveDoc = app.documents.add();
        } else {
            saveDoc = myDoc;
        }
        
        var exportOptions = new ExportOptionsPNG24();
        exportOptions.artBoardClipping = true;
        
        var type = ExportType.PNG24;

        myDoc.artboards.setActiveArtboardIndex(n);

        myDoc.exportFile(newFile, type, exportOptions);
    }

    function saveFileAsSVG(destFile, n ) {
        var newFile = new File(destFile);
        var saveDoc;
        if (app.documents.length == 0) {
            saveDoc = app.documents.add();
        } else {
            saveDoc = myDoc;
        }
        
        var saveOpts = new ExportOptionsSVG();
        saveOpts.saveMultipleArtboards = true;
        saveOpts.artboardRange = '1-6';
        var type = ExportType.SVG;

        saveDoc.exportFile(newFile, type, saveOpts);
    }

    // Creates the folders for the final assets
    var folderNames = [
        '', // Allows to create the parent folder 'productName'
        '/RGB',
        '/CMYK EPS',
        '/RGB/SVG',
        '/RGB/PNG',
        '/RGB/EPS'
    ];

    var betaName = '';
    var parentPath = folderPath + 'ACME ' + productName + betaName + ' logo';

    if(betaTag == true){
        betaName = '_Beta';
    }

    for (i = 0; i<6; i++){
        var folder = new Folder (parentPath + folderNames[i]);
        folder.create();
    }


    // Removes spaces from product name for file naming purposes
    if(y ==0){
        const space = / /gi;
        const linebreak = /\n/gi;
    }
        var newProductName = productName.replace(space, '');
        newProductName = newProductName.replace(linebreak, ''); 

    // Saves the final assets
    if(y == 0){
        exportFileAsEPS(parentPath + '/' + 'RGB/' + 'EPS' + '/' + 'ACME_' + newProductName + betaName)

        for(var i=0; i<myDoc.artboards.length; i++){
            saveFileAsPNG(parentPath + '/' + 'RGB/' + 'PNG' + '/' + 'ACME_' + 
            newProductName + betaName + ' ' + artNameRGB[i],i);
        } 

        saveFileAsSVG(parentPath + '/' + 'RGB/' + 'SVG' + '/' + 'ACME_' + newProductName + betaName);
    }else{
        exportFileAsEPS(parentPath + '/' + 'CMYK EPS/' + 'ACME_' + newProductName + betaName)
    }

    // Closes the document without saving
     if ( app.documents.length > 0 ) {
        var aiDocument = myDoc;
        aiDocument.close( SaveOptions.DONOTSAVECHANGES );
        aiDocument = null;
    } 

    if ( nameTooLong == true & y == 1){
        alert ('The name entered may be too long to be compliant with the guidelines.' + '\n' + 'Please review that the name fits within the size limits.')
    }
}