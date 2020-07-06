var StylePickControl = can.Control.extend({
    init: function() {
        var me = this;
        console.log('StylePickControl init...');

        me.stage = new Konva.Stage({
            container: 'container',
            width: me.options.width,
            height: me.options.height
        });

        me.layer = new Konva.Layer();
        me.stage.add(me.layer);
    },

    getTransformer: function() {
        return new Konva.Transformer({
            rotateEnabled: false,
            keepRatio: true,
            enabledAnchors: [
                'top-left',
                'top-right',
                'bottom-left',
                'bottom-right',
              ],
        });
    },

    addObject: function(image) {
        var me = this;

        var object = new Konva.Image({
            x: 150,
            y: 50,
            id: 'outer',
            image: image,
            width: 367 / 4,
            height: 474 / 4,
            draggable: true
        });
        me.layer.add(object);        
        me.object = object;

        object.on('click', function() {
            me.object = object;

        });

        var tr = me.getTransformer();
        me.layer.add(tr);
        tr.nodes([object]);

        me.layer.draw();
    },

    '.products ul li img click': function(el) {
        var me = this;        
        me.addObject(el[0]);
    },

    '#up click': function() {
        var me = this;

        if(me.object) {
            me.object.moveUp();
            me.layer.draw();
        }

    },

    '#down click': function() {
        var me = this;

        if(me.object) {
            me.object.moveDown();
            me.layer.draw();
        }
    },

    '#remove click': function() {
        var me = this;
        if(me.object) {
            me.object.findAncestor('Transformer').hide();
            me.object.destroy();
            me.object = undefined;
            me.layer.draw();
        }
    }

});

var stylePickControl = new StylePickControl('body', {
    width: 500,
    height: 500
});