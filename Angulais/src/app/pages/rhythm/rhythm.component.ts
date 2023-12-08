import {AfterViewInit, Component, ElementRef, HostListener, ViewChild} from '@angular/core';


@Component({
  selector: 'app-rhythm',
  templateUrl: './rhythm.component.html',
  styleUrls: ['./rhythm.component.scss']
})
export class RhythmComponent implements AfterViewInit {
  @ViewChild('comment') comment!: ElementRef;
  @ViewChild('scoreText') scoreText!: ElementRef;
  @ViewChild('canvaCircles') canvaCircles!: ElementRef;
  @ViewChild('canvaBackground') canvaBackground!: ElementRef;
  @ViewChild('video') video!: ElementRef;

  circles: Circle[] = [];
  circlesPerfect: Circle[] = [];
  circlesEarly: Circle[] = [];
  score: number = 0;
  gameOver: boolean = false;
  timerCircle = null;
  timerBass = null;
  minRadius: number = 10;
  perfectRadius: number = 40;
  earlyRadius: number = 45;
  maxRadius = 100;
  currentRadius: number = 100;
  scaleBy = 1;
  audio!: Promise<HTMLAudioElement>;

  @HostListener('window:keydown', ['$event']) onKeyDown(event: any) {
    if (event.defaultPrevented) {
      return; // Do nothing if the event was already processed
    }

    if(event.key == "Escape")
    {
      this.CloseFenetre()
    }

    this.checkCircle(this.circles, event.key.toLowerCase())
    event.preventDefault();
  }

  ngAfterViewInit(): void {
    //this.audio = new Audio('assets/enchanted-chimes-177906.mp3');
    this.audio = this.video.nativeElement.play();
    this.renderCanvas();
  }

  CloseFenetre()
  {
    // Quitter : Redirection
    window.close()
  }

  checkCircle(circles: Circle[], key: string)
  {
    if (circles.length === 0)
    {
      return;
    }

    let circle = circles[0]
    // Mauvaise touche
    if (circle.letter != key)
    {
      this.comment.nativeElement.textContent = "Mauvaise touche !"
      this.score -= 15
      console.log("Mauvaise touche !")
      this.scoreText.nativeElement.textContent = "SCORE: " + this.score
      // Remove le cercle
      circles.shift()
      return;
    }

    // Trop tard
    if(circle.currentRadius < this.perfectRadius)
    {
      this.comment.nativeElement.textContent = "Trop tard !"
      console.log("Trop tard")
      this.score += 50
    }

    //Parfait
    if(this.perfectRadius < circle.currentRadius && circle.currentRadius < this.earlyRadius)
    {
      this.comment.nativeElement.textContent = "PARFAIT !"
      console.log("PARFAIT")
      this.score += 400
    }

    //Trop tôt
    if(this.earlyRadius < circle.currentRadius)
    {
      this.comment.nativeElement.textContent = "Trop tôt !"
      console.log("Trop tôt")
      this.score += 150
    }
    this.scoreText.nativeElement.textContent = "SCORE: " + this.score
    circles.shift()
  }

  drawShape(ctx: CanvasRenderingContext2D, x: number, y: number, r: number, sides: number, rot: number) {
    rot = rot * Math.PI / 180
    ctx.translate(x, y);

    for (let i = 0; i < sides; i++) {
      const rotation = rot + ((Math.PI * 2)  / sides) * i;

      if (i === 0) {
        ctx.moveTo(r * Math.cos(rotation), r * Math.sin(rotation));
      } else {
        ctx.lineTo(r * Math.cos(rotation), r * Math.sin(rotation));
      }
    }
    ctx.closePath();
    ctx.stroke();

    ctx.resetTransform();
  }

  drawPerfect(circlesPerfect: Circle[], ctx: CanvasRenderingContext2D) {
    for (var i = 0; i < circlesPerfect.length; i++) {
      circlesPerfect[i].drawPerfect(ctx);
    }
  }


  drawEarly(circlesEarly: Circle[], ctx: CanvasRenderingContext2D) {
    for (var i = 0; i < circlesEarly.length; i++) {
      circlesEarly[i].drawEarly(ctx);
    }
  }

  draw(circles: Circle[], ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, this.canvaCircles.nativeElement.width, this.canvaCircles.nativeElement.height)
    for (var i = 0; i < circles.length; i++) {
      circles[i].draw(ctx);
    }
  }

// Resize
  startGame()
  {
    const beats = [
      100, 525, 980, 1950, 2500, 2850, 3480, 5200, 5650,
      6100, 6300, 6800, 7200, 7500, 7900,
      8350, 8724, 9200, 15700, 17735, 18250, 22400,
      22500, 22800, 22950, 23000, 23200,
      23700, 23900, 26500, 26700, 26900, 29800,
      30200, 31100, 31400, 31550, 32200, 32900,
      33150, 34000, 34770, 34950, 35720, 36300, 36500, 36750,
      37150,37350,37600,38000,38200,39150,39750,40850,40950,
      41520,41860,42670,42980,43150,43250,43400,44100,44350,44600,45300,
      46100,46950,47600,47950,48500,48650,49350,49550,49900,50000,50150,
      50400,50600,51100,51300,51880,52750,53000,53650, 53850, 54500,
      54700, 55150, 55600, 56220, 56480, 56780, 56830, 56880, 57000, 57250,
      57850, 57940, 58300, 58450, 59150, 63970, 63250, 66410, 66550, 66700,
      66880, 67000, 67230, 67420, 67530, 67640, 67960, 70120, 70400, 71310
    ]

    for (var i = 4; i < beats.length; i += 3)
    {
      setTimeout(()=>{
        this.NoteBlocks();
      }, beats[i]-2500)
    }
    var timerEndGame = setInterval(() => {
      //this.endGame();
    }, this.video.nativeElement.duration * 1000);
  }

  endGame(){
    this.gameOver = true
    this.video.nativeElement.pause();
    this.video.nativeElement.currentTime = 0;

    this.comment.nativeElement.textContent = "GAME OVER !"
  }

  renderCanvas() {
    this.video.nativeElement.play()
    console.log(this.video.nativeElement.duration)

    if(this.gameOver)
    {
      return;
    }

    this.startGame()

    const ctxBackground = this.canvaBackground.nativeElement.getContext('2d');
    const ctxCircles = this.canvaCircles.nativeElement.getContext('2d');

    const letter = ["R", "T", "Y", "F", "G", "H", "V", "B", "N"]
    for (let i = 0 ; i < 3 ; i++) {
      for (let j = 0 ; j < 3 ; j++) {
        //circles.push(new Circle(75+155*i, 72+155*j, 100-20*((i+j))))
        this.circlesPerfect.push(new Circle(75+155*i, 72+155*j, this.perfectRadius, letter[i+3*j]));
        this.circlesEarly.push(new Circle(75+155*i, 72+155*j, this.earlyRadius, ''));
      }
    }
    this.createGrid(ctxBackground)
    setInterval( () => {

      for (let i = 0; i < this.circles.length; i++)
      {
        if (this.circles[i].currentRadius > this.minRadius)
        {
          this.circles[i].currentRadius -= 1
        }
      }
      this.draw(this.circles, ctxCircles)
    }, 25)

    setInterval( () =>
    {
      for (var i = 0; i < this.circles.length; i++)
      {

        if (this.circles[i].currentRadius == this.minRadius && this.circles[i].timeBeforeRemove > 0)
        {
          this.circles[i].timeBeforeRemove -= 1
          this.circles[i].color = "red"
        }
      }

      if(this.circles.length > 0 && this.circles[0].timeBeforeRemove <= 0)
      {
        this.comment.nativeElement.textContent = "Raté !";
        this.score -= 10;
        this.scoreText.nativeElement.textContent = "SCORE: " + this.score;
        this.circles.shift();
      }

    }, 1)

    this.NoteBlocks()
    this.drawPerfect(this.circlesPerfect, ctxBackground)
    this.drawEarly(this.circlesEarly, ctxBackground)
    this.draw(this.circles, ctxCircles)
  }

  createGrid(ctx: CanvasRenderingContext2D) {
    const size = 150;
    const pad_size = 5;
    for (let i = 0 ; i < 3 ; i++) {
      for (let j = 0 ; j < 3 ; j++) {
        ctx.fillStyle = "HSL("+(0 + (i+3*j)*40).toString()+", 45%, 45%)"
        ctx.fillRect(0 + (size+pad_size) * i, 0 + (size+pad_size) * j, size, size);
      }
    }
  }

  NoteBlocks(){
    const letter = ["r", "t", "y", "f", "g", "h", "v", "b", "n"]
    const i = Math.floor(Math.random()*(letter.length-0.1))
    const x = i%3
    const y = Math.floor(i/3)
    this.circles.push(new Circle(75+155*x, 72+155*y, this.currentRadius, letter[i]))
    console.log(letter[i])

  }
}

class Circle {
  x: number;
  y: number;
  currentRadius: number;
  letter: string;
  timeBeforeRemove: number;
  color: string;
  
  constructor(x: number, y: number, radius: number, letter: string) {
    this.x = x;
    this.y = y;
    this.currentRadius = radius;
    this.letter = letter;
    this.timeBeforeRemove = 40;
    this.color = '#E1E1E1'
  }

  drawPerfect(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.currentRadius, 0, Math.PI * 2)
    ctx.font = "30px Arial";
    ctx.fillStyle = 'white';
    ctx.fillText(this.letter, this.x - 10, this.y + 10);
    ctx.strokeStyle ='rgb(255,215,0,0.6)'
    ctx.lineWidth = 2
    ctx.stroke()
  }

  drawEarly(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.currentRadius, 0, Math.PI * 2)
    ctx.strokeStyle ='rgb(255,215,0,0.6)'
    ctx.lineWidth = 2
    ctx.stroke()
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.currentRadius, 0, Math.PI * 2)
    ctx.strokeStyle = this.color
    ctx.lineWidth = 5
    ctx.stroke()
  }
}
