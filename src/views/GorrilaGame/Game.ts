type Building = {
    x: number;
    width: number;
    height: number;
};

type MainBuilding = Building & {
    floors: number;
    windowPerFloor: number;
    window: {
        width: number;
        height: number;
        gap: number;
    }
    lightsOn: boolean[]
};

type GameState = {
    phase: 'start' | 'playing' | 'end';
    score: number;

    backgroundBuilding: Building[];
    building: MainBuilding[];
}

export class Game {
    ctx: CanvasRenderingContext2D;
    gorillaA: Gorilla;
    gorillaB: Gorilla;

    state: GameState = {
        phase: 'start',
        score: 0,
        backgroundBuilding: [],
        building: [],
    };



    constructor(canvas: HTMLCanvasElement) {
        const ctx = canvas.getContext('2d');
        if (!ctx) {
            throw new Error('2d context not supported');
        }
        this.ctx = ctx;

        this.init();
        this.render();
    }

    private init() {
        this.state.backgroundBuilding = generateBgBuildings(10);
        this.state.building = generateMainBuildings(10);
    }

    render() {
        this.ctx.save();
        optimizeCanvas(this.ctx.canvas);
        this.ctx.translate(0, this.ctx.canvas.height);
        this.ctx.scale(1, -1);

        // draw scene
        this.drawBackground();
        this.drawBgBuilding();
        this.drawMainBuilding();
        this.drawGorilla('A');

        this.ctx.restore();
    }

    private drawBackground() {
        const gradient = this.ctx.createLinearGradient(0, 0, 0, this.ctx.canvas.height);
        gradient.addColorStop(0, '#F88A85');
        gradient.addColorStop(1, '#FFC38E');

        // draw background
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

        // draw moon
        this.ctx.beginPath();
        this.ctx.arc(150, this.ctx.canvas.height - 150, 70, 0, Math.PI * 2);
        this.ctx.fillStyle = `#FFFFFFA0`
        this.ctx.fill();
    }

    private drawBgBuilding() {
        this.ctx.fillStyle = '#947285';
        this.state.backgroundBuilding.forEach(building => {
            this.ctx.fillRect(building.x, 0, building.width, building.height);
        });
    }

    private drawMainBuilding() {
        this.ctx.fillStyle = '#4A3C68';
        console.log(this.state.building.length, this.state.building);
        this.state.building.forEach(building => {
            this.ctx.fillRect(building.x, 0, building.width, building.height);

            // draw windows

            const [windowWidth, windowHeight, gap] = [building.window.width, building.window.height, building.window.gap];

            for (let floor = 0; floor < building.floors; floor++) {
                for (let room = 0; room < building.windowPerFloor; room++) {
                    const currentWindow = room + floor * building.windowPerFloor;
                    // console.table(building.lightsOn);
                    if (building.lightsOn[currentWindow]) {
                        this.ctx.save();
                        this.ctx.translate(building.x + gap, building.height - gap);
                        this.ctx.scale(1, -1);

                        const x = room * (windowWidth + gap);
                        const y = floor * (windowHeight + gap);

                        this.ctx.fillStyle = 'white';
                        this.ctx.fillRect(x, y, windowWidth, windowHeight);

                        this.ctx.restore();
                    }
                }
            }

        });
    }

    private drawGorilla(player: 'A' | 'B') {
        this.ctx.save();

        const building = player === 'A' ? this.state.building.at(1) : this.state.building.at(-2);
        this.ctx.translate(building!.x + building!.width / 2, building!.height);

        new Gorilla(this.ctx);




        this.ctx.restore();



    }
}

function generateBgBuildings(count = 10) {
    const building: Building[] = [];
    const gap = 10;
    const [minWidth, maxWidth] = [100, 300];
    const [minHeight, maxHeight] = [250, 700];

    for (let i = 0; i < count; i++) {
        buildingMeta(i);
    }
    return building;

    function buildingMeta(i: number) {
        const prev = building[i - 1];
        const x = prev ? prev.x + prev.width + gap : 0;

        const width = Math.floor(Math.random() * (maxWidth - minWidth) + minWidth);
        const height = Math.floor(Math.random() * (maxHeight - minHeight) + minHeight);

        building.push({ x, width, height });
    }
}

function generateMainBuildings(count = 10) {
    const building: MainBuilding[] = [];
    const gap = 10;
    const [minWidth, maxWidth] = [100, 300];
    const [minHeight, maxHeight] = [250, 700];
    const [minGHeight, maxGHeight] = [150, 500];

    const [windowWidth, windowHeight] = [12, 18];


    for (let i = 0; i < count; i++) {
        buildingMeta(i);
    }

    return building;

    function buildingMeta(i: number) {
        const platformWithGorilla = i === 1 || i === 7;
        const prev = building[i - 1];
        const x = prev ? prev.x + prev.width + gap : 0;

        const width = Math.floor(Math.random() * (maxWidth - minWidth) + minWidth);
        const height = platformWithGorilla
            ? Math.floor(Math.random() * (maxGHeight - minGHeight) + minGHeight)
            : Math.floor(Math.random() * (maxHeight - minHeight) + minHeight);


        const numberOfFloors = Math.ceil(height / (windowHeight + gap));
        const numberOfWindowsPerFloor = Math.floor(width / (windowWidth + gap));

        const windowCount = numberOfFloors * numberOfWindowsPerFloor;
        const lightsOn: boolean[] = [];
        for (let i = 0; i < windowCount; i++) {
            lightsOn.push(Math.random() <= 0.33);
        }

        building.push({
            x, width, height,
            lightsOn,
            floors: numberOfFloors,
            windowPerFloor: numberOfWindowsPerFloor,
            window: { width: windowWidth, height: windowHeight, gap }
        });
    }
}



function optimizeCanvas(canvas: HTMLCanvasElement) {
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
}



class Gorilla {
    ctx: CanvasRenderingContext2D;
    player: string;
    phase : "aiming" | "idle" | "celebrating" 

    constructor(ctx: CanvasRenderingContext2D , player: string ) {
        this.ctx = ctx;
        this.player = player;
        this.phase = "idle";
        this.drawBody();
        this.drawArm('left');
        this.drawArm('right');

    }


    drawBody() {
        this.ctx.fillStyle = 'black';
        this.ctx.beginPath();
        this.ctx.moveTo(0, 15);
        this.ctx.lineTo(-7, 0);
        this.ctx.lineTo(-20, 0);
        this.ctx.lineTo(-17, 18);
        this.ctx.lineTo(-20, 44);

        this.ctx.lineTo(-11, 77);
        this.ctx.lineTo(0, 84);
        this.ctx.lineTo(11, 77);

        this.ctx.lineTo(20, 44);
        this.ctx.lineTo(17, 18);
        this.ctx.lineTo(20, 0);
        this.ctx.lineTo(7, 0);
        this.ctx.fill();
    }

    drawArm(side: 'left' | 'right') {
        const flag = side === 'right' ? 1 : -1;
        this.ctx.strokeStyle = 'black';
        this.ctx.lineWidth = 18;

        this.ctx.beginPath();
        this.ctx.moveTo(flag * 14, 50);

        if (this.phase === "aiming" && this.player === "A") {
            this.ctx.quadraticCurveTo( flag * 44, 63, flag * 28, 107);
        } else if (this.phase === "aiming" && this.player === "B") {
            
        }

        this.ctx.quadraticCurveTo( flag * 44, 45, flag * 28, 12);

        this.ctx.stroke();
    }

    set setPhase(phase: "aiming" | "idle" | "celebrating") {
        this.phase = phase;
    }
}