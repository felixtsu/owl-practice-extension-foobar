namespace SpriteKind {
    export const Dragonfly = SpriteKind.create()
}

namespace adventure {

    let animationPlayered = false;

    //%block
    //%blockId=adventureDie block="死去并且播放动画"
    export function die() {
        // 实现这个函数，做到播放动画完了再死去
        if (!animationPlayered) {
            animationPlayered = true
            animation.runImageAnimation(duckSprite, assets.animation`meltDuckAnimation`, 200)
            duckSprite.lifespan = 1400
            duckSprite.onDestroyed(function() {
                game.over()
            })
        }
    }

    //%block
    //%blockId=adventureDropAppleFromTree block="间隔一段时间掉苹果 %treeSprite=variables_get(mySprite)"
    export function dropAppleFromTree(treeSprite:Sprite) {
       // 实现这个函数，做到
       // 1. 每隔3秒掉一个苹果
       // 2. 树会提示苹果掉落的倒计时
       sprites.setDataNumber(treeSprite, "timer", 3)

        let exist = true
        treeSprite.onDestroyed(function() {
            exist = false
        })

        game.onUpdateInterval(1000, function() {
            if (!exist) {
                return
            }
            let timer = sprites.readDataNumber(treeSprite, "timer")
            timer -= 1 
            sprites.setDataNumber(treeSprite, "timer", timer)
            if (timer == 0) {
                let appleSprite = sprites.create(img`
                . . . . . . . e c 7 . . . . . .
                . . . . e e e c 7 7 e e . . . .
                . . c e e e e c 7 e 2 2 e e . .
                . c e e e e e c 6 e e 2 2 2 e .
                . c e e e 2 e c c 2 4 5 4 2 e .
                c e e e 2 2 2 2 2 2 4 5 5 2 2 e
                c e e 2 2 2 2 2 2 2 2 4 4 2 2 e
                c e e 2 2 2 2 2 2 2 2 2 2 2 2 e
                c e e 2 2 2 2 2 2 2 2 2 2 2 2 e
                c e e 2 2 2 2 2 2 2 2 2 2 2 2 e
                c e e 2 2 2 2 2 2 2 2 2 2 4 2 e
                . e e e 2 2 2 2 2 2 2 2 2 4 e .
                . 2 e e 2 2 2 2 2 2 2 2 4 2 e .
                . . 2 e e 2 2 2 2 2 4 4 2 e . .
                . . . 2 2 e e 4 4 4 2 e e . . .
                . . . . . 2 2 e e e e . . . . .
                `, SpriteKind.Food)
                appleSprite.x = treeSprite.x
                appleSprite.y = treeSprite.y
                appleSprite.vy = 8
                treeSprite.say("new apple")
                sprites.setDataNumber(treeSprite, "timer", 4)
            } else {
                treeSprite.say(timer.toString())
                sprites.setDataNumber(treeSprite, "timer", timer)
            }

            
        })

        scene.onHitWall(SpriteKind.Food, function(sprite: Sprite, location: tiles.Location) {
            sprite.destroy(effects.ashes, 1000)
        })
    }

    //%block
    //%blockId=adventureChopTree block="砍树"
    export function chopTree() {
        // 实现这个函数，做到
        // 将角色所在位置的树砍掉
         for (let treeSprite of sprites.allOfKind(SpriteKind.Tree)) {
            if (duckSprite.overlapsWith(treeSprite)) {
                treeSprite.destroy()
            } 
        }
    }

    let dragonflySprite :Sprite = null

    //%block
    //%blockId=adventureSpawnDragonfly block="在 %loaction=variables_get(location) 生成一秒后自动死亡的蜻蜓"
    export function spawnDragonfly(location : tiles.Location) {
        // 实现这个函数，做到
        // 生成一只一秒后自动死亡的蜻蜓
        dragonflySprite = sprites.create(assets.image`dragonfly`, SpriteKind.Dragonfly)
        tiles.placeOnTile(dragonflySprite, location)
        dragonflySprite.lifespan = 1000
    }

    //%block
    //%blockId=adventureFreshDragonfly block="最新鲜的蜻蜓"
    export function freshDragonfly() : Sprite{
        // 实现这个函数，做到
        // 返回最晚生成的一只蜻蜓
        return dragonflySprite;
    }
}