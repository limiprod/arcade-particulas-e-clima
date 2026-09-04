/**
 * Extensão: Sistema de Clima e Partículas Avançado
 * Adiciona efeitos ambientais, tempestades, chuva, neve e neblina aos teus jogos.
 */

//% color="#2980B9" weight=100 icon="\uf0c2" block="Clima e Partículas"
namespace climaEParticulas {

    let emTempestade = false;

    export enum TipoClima {
        //% block="Chuva Leve"
        ChuvaLeve,
        //% block="Tempestade com Raios"
        Tempestade,
        //% block="Neve Intermitente"
        Neve,
        //% block="Poeira Mística"
        PoeiraMistica,
        //% block="Lava Flutuante"
        Lava,
        //% block="Limpo"
        Limpo
    }

    /**
     * Limpa todas as partículas ativas no ecrã
     */
    function limparTodasParticulas(): void {
        particles.clearAll();
    }

    /**
     * Define o clima atual do mapa
     */
    //% block="definir clima do jogo para %clima"
    //% clima.defl=climaEParticulas.TipoClima.ChuvaLeve
    export function definirClima(clima: TipoClima): void {
        emTempestade = false;
        limparTodasParticulas();

        if (clima == TipoClima.ChuvaLeve) {
            effects.blizzard.startScreenEffect();
            music.smallCrash.play();

        } else if (clima == TipoClima.Tempestade) {
            effects.blizzard.startScreenEffect();
            emTempestade = true;

            control.runInParallel(function () {
                while (emTempestade) {
                    pause(Math.randomRange(2000, 5000));
                    if (!emTempestade) break;

                    scene.setBackgroundColor(1);
                    music.bigCrash.play();
                    scene.cameraShake(5, 200);
                    pause(50);
                    scene.setBackgroundColor(0);
                }
            });

        } else if (clima == TipoClima.Neve) {
            effects.blizzard.startScreenEffect();

        } else if (clima == TipoClima.PoeiraMistica) {
            effects.starField.startScreenEffect();

        } else if (clima == TipoClima.Lava) {
            effects.bubbles.startScreenEffect();

        } else if (clima == TipoClima.Limpo) {
            limparTodasParticulas();
        }
    }

    /**
     * Simula uma rajada de vento empurrando um sprite
     */
    //% block="aplicar ventania em %sprite=variables_get(mySprite) com força X %forcaX"
    //% forcaX.defl=80
    export function aplicarVento(sprite: Sprite, forcaX: number): void {
        if (sprite) {
            sprite.vx += forcaX;
            scene.cameraShake(1, 100);
            music.thump.play();
        }
    }

    /**
     * Solta uma onda de choque em torno de uma posição no mapa
     */
    //% block="criar onda de choque ambiental em x %x y %y"
    //% x.defl=80 y.defl=60
    export function ondaDeChoque(x: number, y: number): void {
        let choque = sprites.create(image.create(1, 1), SpriteKind.Food);
        choque.setPosition(x, y);
        choque.startEffect(effects.halo, 600);
        scene.cameraShake(3, 300);
        music.smallCrash.play();
        pause(600);
        choque.destroy();
    }

    /**
     * Faz cair um raio direto num sprite específico
     */
    //% block="atirar raio místico em %sprite=variables_get(mySprite)"
    export function atirarRaio(sprite: Sprite): void {
        if (sprite) {
            let raio = sprites.create(image.create(2, 120), SpriteKind.Projectile);
            raio.image.fill(1);
            raio.setPosition(sprite.x, sprite.y - 60);
            scene.cameraShake(6, 400);
            music.bigCrash.play();
            sprite.startEffect(effects.fire, 500);
            pause(150);
            raio.destroy();
        }
    }

    /**
     * Adiciona aura de energia ao redor do jogador
     */
    //% block="ativar aura mística em %sprite=variables_get(mySprite) com efeito %ativar"
    //% ativar.defl=true
    export function auraMistica(sprite: Sprite, ativar: boolean): void {
        if (sprite && ativar) {
            sprite.startEffect(effects.warmRadial, 5000);
        }
    }
}