var StylePickControl = can.Control.extend({
    init: function() {
        var me = this;
        console.log('StylePickControl init...');

        me.canvas = new fabric.Canvas('container', {
            width: me.options.width,
            height: me.options.height
        });
    },

    addObject: function(image) {
        var me = this;
        var image = new fabric.Image(image, {            
            lockUniScaling: true,
            lockRotation: true            
        });

        me.object = image;
        
        me.canvas.add(image);
    },

    '.products ul li img click': function(el) {
        var me = this;        
        me.addObject(el[0]);
    },

    '#up click': function() {
        var me = this;

        me.canvas.bringToFront(me.canvas.getActiveObject());

        console.log(me.canvas.getObjects().indexOf(me.canvas.getActiveObject()));
    },

    '#down click': function() {
        var me = this;

        me.canvas.sendToBack(me.canvas.getActiveObject());

        console.log(me.canvas.getObjects().indexOf(me.canvas.getActiveObject()));
    },

    '#remove click': function() {
        var me = this;
        me.canvas.remove(me.canvas.getActiveObject());
    },

    '#save click': function() {
        var me = this;
        if (!fabric.Canvas.supports('toDataURL')) {
            alert('이 브라우저는 이미지 저장 기능을 지원하지 않습니다.');
        } else {
            window.open(me.canvas.toDataURL('png'));
        }
    }

});

var stylePickControl = new StylePickControl('body', {
    width: 500,
    height: 500
});