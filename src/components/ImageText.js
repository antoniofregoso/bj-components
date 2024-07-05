import { AppElement } from "@buyerjourney/bj-core";
import SimpleParallax from "simple-parallax-js/vanilla";
import { Remarkable } from "remarkable";

export class ImageText extends AppElement {

    #default = {
        imagePosition:"left",
        textWidth:"is-half",
        imageWidth:"is-half"
        };

    constructor(props={}){
        super();
        this.state =this.initState(this.#default,props);
        this.getAttribute("id")||this.setAttribute("id",this.state.id||`component-${Math.floor(Math.random() * 100)}`);
        this.setAttribute("img-pos",this.state.imagePosition);
        this.setAttribute("text-width",this.state.textWidth);
        this.setAttribute("img-width",this.state.imageWidth);
        this.classList.add('columns','is-vcentered', 'is-gapless','my-0');
        this.md = new Remarkable();
    }

    static get observedAttributes() {
        return ["text-width", "img-width", "img-pos"];
      }
      
      attributeChangedCallback(name, old, now) {
        this.render()
      }
      
      handleEvent(event) {
              if (event.type === "click") {
                  let eventName;
                  if(this.state.buttons.eventName===undefined){
                    eventName = "user:click-image-text"
                  }else {
                    eventName = this.state.buttons.eventName
                  }
                  const clickFunnel = new CustomEvent(eventName,{
                  detail:{source:event.target.id},
                  bubbles: true,
                  composed: true
              });
              this.dispatchEvent(clickFunnel);
              }
          }
      
      
      
      
      addEvents(){
        let buttons = this.querySelectorAll("button");
        if (buttons.length>0){
          buttons.forEach((item)=>{
            item.addEventListener("click",this)
          });    
        }  
      }

    render(){
        let img = /* html */`
            <div  ${this.getClasses(["column"], [this.state.imageWidth])}>
                <figure ${this.getClasses(["image"], this.state.image?.classList)} ${this.setAnimation(this.state.image?.animation)}>
                    <img src="${this.state.image?.src}" ${this.state.image?.filter?`style="filter: ${this.state.image?.filter};"`:''} >
                </figure>
            </div>
            `
        let text = /* html */`  
        <div ${this.getClasses(["column"], this.state.textWidth)}>
            <div  class="p-4 content"> 
                ${this.state.caption?.text[this.state.context.lang]!=undefined?`
                <p ${this.getClasses(["subtitle"], this.state.caption?.classList)}  ${this.setAnimation(this.state.caption.animation)}>
                ${this.state.caption.text[this.state.context.lang]}
                </p>`:''}         
                ${this.state.title?.text[this.state.context.lang]!=undefined?`
                <h1 ${this.getClasses(["title"], this.state.title?.classList)}  ${this.setAnimation(this.state.title?.animation)}>
                    ${this.state.title.text[this.state.context.lang]}
                </h1>`:''}
                ${this.state.subtitle?.text[this.state.context.lang]!=undefined?`
                <h2 ${this.getClasses(["subtitle"], this.state.subtitle?.classList)}  ${this.setAnimation(this.state.subtitle?.animation)}>
                    ${this.state.subtitle.text[this.state.context.lang]}
                </h2>`:''}
                ${this.state.description?.text[this.state.context.lang]!=undefined?`
                <div ${this.getClasses(["content"], this.state.description?.classList)} ${this.setAnimation(this.state.description?.animation)}>
                    ${this.md.render(this.state.description?.text[this.state.context.lang])}
                </div>`:''}    
                ${this.state.buttons!=undefined?this.buttonsRender(this.state.buttons):''}               
            </div>
        </div>
            `
        this.innerHTML =  /* html */`
                ${this.state.imagePosition==='right'?text:img}
                ${this.state.imagePosition==='right'?img:text}
        `
        this.addEvents()
        if(this.state.image?.paralax!=undefined){
            var image = this.querySelector('img')   
            new SimpleParallax(image,this.state.image.paralax) 
        }
    }


}

customElements.define("image-text", ImageText)