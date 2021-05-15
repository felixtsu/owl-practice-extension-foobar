namespace SpriteKind {
    export const Tree = SpriteKind.create()
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    adventure.chopTree()
})
scene.onOverlapTile(SpriteKind.Player, sprites.swamp.swampTile3, function (sprite, location) {
    adventure.die()
})
let treeSprite: Sprite = null
tiles.setTilemap(tilemap`level1`)
let duckSprite = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . b 5 5 b . . . 
    . . . . . . b b b b b b . . . . 
    . . . . . b b 5 5 5 5 5 b . . . 
    . b b b b b 5 5 5 5 5 5 5 b . . 
    . b d 5 b 5 5 5 5 5 5 5 5 b . . 
    . . b 5 5 b 5 d 1 f 5 d 4 f . . 
    . . b d 5 5 b 1 f f 5 4 4 c . . 
    b b d b 5 5 5 d f b 4 4 4 4 b . 
    b d d c d 5 5 b 5 4 4 4 4 4 4 b 
    c d d d c c b 5 5 5 5 5 5 5 b . 
    c b d d d d d 5 5 5 5 5 5 5 b . 
    . c d d d d d d 5 5 5 5 5 d b . 
    . . c b d d d d d 5 5 5 b b . . 
    . . . c c c c c c c c b b . . . 
    `, SpriteKind.Player)
controller.moveSprite(duckSprite)
for (let value of tiles.getTilesByType(assets.tile`myTile`)) {
    treeSprite = sprites.create(img`
        .............6666...............
        ..........666667766.6666........
        .........677777777767776........
        ......66667775577757777666......
        .....677666675557557776777666...
        .....6776777775555577777766776..
        ...66666777777775777777766666...
        .66667767777755757555777776776..
        6666777677775577557555777767766.
        .6667767777777775577777777767666
        .c6766777677777775777777677766..
        cc77666667777777777777777666666c
        cc76666677777777777777777766776c
        c6666776777777777777766677666776
        66667766667776777767767766766666
        ccc76677677776677766767776776ccc
        cc7766776777677677676667767766cc
        .666c676667677766667766666666cc.
        .ccc66676666776666677677666cccc.
        ...ccc77c6767666676676677666ccc.
        ...cc676c7766676677666666c666cc.
        ....c6cc676c6677677c66c666ccc...
        ....ccccc6c66667667cc6ccc6ccc...
        ......ccccc66c66c66cccccccc.....
        .......cc.cc6c6ccc6cccc.cc......
        ...........cccccccccc...........
        .............feeeeee............
        ............feeeeeefe...........
        .........eeeeefeeeffee..........
        ............ffffeef..ee.........
        ...............fee..............
        ................e...............
        `, SpriteKind.Tree)
    tiles.placeOnTile(treeSprite, value)
    treeSprite.y += -8
    adventure.dropAppleFromTree(treeSprite)
}
game.onUpdateInterval(1000, function () {
    adventure.spawnDragonfly(tiles.getTilesByType(assets.tile`pond`)._pickRandom())
})
forever(function () {
    duckSprite.follow(adventure.freshDragonfly())
})
