function foreach(obj, callback) {
    if (obj instanceof Array) {
        for (var i in obj) {
            callback(obj[i]);
        }
    } else {
        for (var item in obj) {
            callback(item);
        }
    }
}

function getElementsByClass(searchClass,node,tag) {
    var classElements = new Array();
    if ( node == null )
        node = document;
    if ( tag == null )
        tag = '*';
    var els = node.getElementsByTagName(tag);
    var elsLen = els.length;
    var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
    for (i = 0, j = 0; i < elsLen; i++) {
        if ( pattern.test(els[i].className) ) {
            classElements[j] = els[i];
            j++;
        }
    }
    return classElements;
}

function show_more(name) {
    var section = document.getElementById("#"+name);
    if (section) {
        var hidden = getElementsByClass("hide", section);
        foreach(hidden, function(row) {
            row.style.display = "block";
        });
        foreach(getElementsByClass("button", section), function(elmt) {
            elmt.style.display = "none";
        });
    }
}
