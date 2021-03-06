'use strict'
class mySite {

    constructor() {

        this.createOverlayAndSideBar();
        
    }

    createOverlayAndSideBar() {
       
        let sidebarOpts = Array();
        let overlayDiv = document.createElement("div");
        let bgColor = `rgba(${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 190)},${Math.floor(Math.random() * 256)},1)`;

        console.log(bgColor);
        overlayDiv.id = "site-overlay";
        overlayDiv.classList.add(`site-overlay`);
        overlayDiv.style = `height:${window.innerHeight}px;width:${window.innerWidth}px;background-color:${bgColor};`;
        document.body.appendChild(overlayDiv);


        let infoContainer = document.createElement('div');
        infoContainer.id = 'site-info-container';
        infoContainer.classList.add('site-info-container');
        overlayDiv.appendChild(infoContainer);
        this.loadAboutMe();


        let sidebarDiv = document.createElement('div');
        sidebarDiv.id = `site-sidebar`;
        sidebarDiv.classList.add(`site-sidebar`);
        sidebarDiv.style = `width:${0.05*window.innerWidth}; height:${window.innerWidth}px;`;
        overlayDiv.appendChild(sidebarDiv);
        let divStyle = `height:${toolbar.offsetWidth - 6}px;`;


        let aboutMeDiv = document.createElement('div');
        aboutMeDiv.id = `about-me`;
        aboutMeDiv.classList.add(`about-me`);
        aboutMeDiv.setAttribute('data-title', `About Me`);
        aboutMeDiv.style = divStyle;
        aboutMeDiv.innerHTML = '&#581;';
        sidebarOpts.push(aboutMeDiv);

        let contactMeDiv = document.createElement('div');
        contactMeDiv.id = `contact-me`;
        contactMeDiv.classList.add(`contact-me`);
        contactMeDiv.setAttribute('data-title', `Contact Me`);
        contactMeDiv.style = divStyle;
        contactMeDiv.setAttribute('data-img-src', '');
        contactMeDiv.innerHTML = '&#9743;';
        sidebarOpts.push(contactMeDiv);

    
        let myWork = document.createElement('div');
        myWork.id = `my-work`;
        myWork.classList.add(`my-work`);
        myWork.setAttribute('data-title', `My Work`);
        myWork.style = divStyle;
        myWork.innerHTML = '&#9816;';
        sidebarOpts.push(myWork);

        let supportMeDiv = document.createElement('div');
        supportMeDiv.id = `support-me`;
        supportMeDiv.classList.add(`support-me`);
        supportMeDiv.setAttribute('data-title', `Support Me`);
        supportMeDiv.style = divStyle;
        supportMeDiv.innerHTML = '$';
        supportMeDiv.addEventListener('click', ()=>window.open('https://www.patreon.com/ujw0l', '_blank'));
        sidebarOpts.push(supportMeDiv);

        sidebarDiv.style.paddingTop = ((overlayDiv.offsetHeight - (sidebarOpts.length * sidebarDiv.offsetWidth)) / 2) + 'px'

        sidebarOpts.map((x, i) => {
            setTimeout(() => {
                sidebarDiv.appendChild(x);
                x.style.backgroundColor = bgColor;
                x.style.height = x.offsetWidth - 5 + 'px';
                x.style.opacity = '1';
                x.style.boxShadow = `-1px -1px 1px ${bgColor}`;
                x.style.fontSize = (0.70 * x.offsetWidth) + 'px';
                x.addEventListener('mouseenter', event => this.animateTitle(event));
                x.addEventListener('mouseleave', () => document.querySelector('#site-sidebar').removeChild(document.querySelector('#info-para')));
            }, (150 * i))
        });

        this.requiredEventListener();
        window.addEventListener('resize',()=>this.resizePage());
        

    }


    resizePage(){

        let overlayDiv = document.querySelector('#site-overlay');
        let toolbarDiv = document.querySelector('#site-sidebar');
        let siteContent = document.querySelector('#site-info-container');
        let toolbarOpts = Array.from(toolbarDiv.querySelectorAll('div'));

        overlayDiv.style.width =  `${window.innerWidth}px`;
        overlayDiv.style.height =  `${window.innerHeight}px`;
        siteContent.style.width = (0.90*window.innerWidth)+'px';
        toolbarDiv.style.paddingTop = ((window.innerHeight - (toolbarOpts.length * toolbarDiv.offsetWidth)) / 2) + 'px';
        toolbarDiv.style.width = (0.05*window.innerWidth)+'px';
        toolbarDiv.style.height = window.innerHeight+'px';
        toolbarOpts.map(x => {
            x.style.height = 0.05*window.innerWidth + 'px';
            x.style.fontSize = (0.70 * 0.05*window.innerWidth) + 'px';
        });
    }



    animateTitle(e) {
        let sidebarDiv = document.querySelector('#site-sidebar');
        let infoPara = document.createElement('p');
        infoPara.id = 'info-para';
        infoPara.classList.add('info-para');
        sidebarDiv.appendChild(infoPara);

        e.target.getAttribute('data-title').split('').map((x, i) => {
            setTimeout(() => {
                let letterB = document.createElement('b');
                let randColor = `rgba(${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 190)},${Math.floor(Math.random() * 256)},1)`;
                letterB.innerHTML = x;
                letterB.style.color = randColor;
                letterB.style.textShadow = `0px 1px 5px ${randColor}`;
                infoPara.appendChild(letterB);
            }, (30 * i))

        });

    }


    loadAboutMe() {
        let infoDiv = document.querySelector('#site-info-container');
        infoDiv.innerHTML = '';
        var xhttp = new XMLHttpRequest();
        xhttp.open("GET", 'site/assets/ajax-content/about-me.txt', true);
        xhttp.responseType = "text";
        xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;');
        xhttp.addEventListener('load', event=>{

            if (event.target.status >= 200 && event.target.status < 400) {

                let secHeader = document.createElement('h1');
                secHeader.id = `section-header`;
                secHeader.classList.add('section-header');
                infoDiv.appendChild(secHeader);

                let secInfo = document.createElement('div');
                secInfo.id = 'about-me-info';
                secInfo.classList.add('about-me-info');
                infoDiv.appendChild(secInfo);

                let contentArr = event.target.response.split('<break>');

                contentArr.map((content, i) => {
                    if (0 === i) {
                        content.split('').map((x, i) => {
                            setTimeout(() => {
                                let headerB = document.createElement('b');
                                let randColor =  `rgba(${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 190)},${Math.floor(Math.random() * 256)},1)`;
                                headerB.innerHTML = x;
                                headerB.style.color = randColor;
                                headerB.style.textShadow = `0px 2px 10px ${randColor}`;
                                secHeader.appendChild(headerB);
                            }, (100 * i));
                        });
                    } else {

                        secInfo.appendChild(document.createElement('br'));
                        secInfo.appendChild(document.createElement('br'));
                        secInfo.appendChild(document.createElement('br'));
                        content.split('').map((x, i) => {
                            setTimeout(() => {
                                let infoB = document.createElement('b')
                                let randColor = `rgba(${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 190)},${Math.floor(Math.random() * 256)},1)`;
                                if (i == 704) {
                                    infoB.innerHTML = x + '<br/><br/>';
                                } else {
                                    infoB.innerHTML = x;
                                }
                                infoB.style.color = randColor;
                                infoB.style.textShadow = `0px 1px 5px ${randColor}`;
                                secInfo.appendChild(infoB);
                            }, (20 * i));
                        });
                    }

                });

            } else {
                alert(even.target.response);
            }


        });
      
       xhttp.addEventListener('error',event=>alert(event.type))
        xhttp.send();

        setTimeout(() => {

            document.querySelector('#about-me').style.borderRadius = '10%';
            document.querySelector('#contact-me').style.borderRadius = '';
            document.querySelector('#my-work').style.borderRadius = '';

        }, 1100);

    }

    loadContactMe() {

        let infoDiv = document.querySelector('#site-info-container');
        infoDiv.innerHTML = '';
        var xhttp = new XMLHttpRequest();
        xhttp.open("GET", 'site/assets/ajax-content/contact-me.txt', true);
        xhttp.responseType = "text";
        xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;');

     

        xhttp.addEventListener('load',event=>{

            if (event.target.status >= 200 && event.target.status < 400) {

                let secHeader = document.createElement('h1');
                secHeader.id = `section-header`;
                secHeader.classList.add('section-header');
                infoDiv.appendChild(secHeader);

                let secInfo = document.createElement('div');
                secInfo.id = 'contact-me-info';
                secInfo.classList.add('contact-me-info');
                infoDiv.appendChild(secInfo);

                console.log(secInfo);

                let contentArr = event.target.response.split('<break>');

                contentArr.map((content, i) => {

                    if (0 === i) {

                        content.split('').map((x, i) => {
                            setTimeout(() => {
                                let headerB = document.createElement('b');
                                let randColor = `rgba(${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 190)},${Math.floor(Math.random() * 256)},1)`;
                                headerB.innerHTML = x;
                                headerB.style.color = randColor;
                                headerB.style.textShadow = `0px 2px 10px ${randColor}`;
                                secHeader.appendChild(headerB);
                            }, (100 * i));
                        });

                    } else {
                        content.split('').map((x, i) => {
                            setTimeout(() => {
                                let infoB = document.createElement('b')
                                let randColor = `rgba(${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 190)},${Math.floor(Math.random() * 256)},1)`;
                                if (i === 27 || i === 55 || i === 82 || i === 101) {
                                    infoB.innerHTML = x + '<br/><br/>';
                                } else {
                                    infoB.innerHTML = x;
                                }
                                infoB.style.color = randColor;
                                infoB.style.textShadow = `0px 1px 5px ${randColor}`;
                                secInfo.appendChild(infoB);
                            }, (100 * i));
                        });
                    }

                });

            } else {
                alert(event.target.response);
            }

            
        })
     
        xhttp.addEventListener('error',event=>alert(event.type))

        xhttp.send();

        setTimeout(() => {
            document.querySelector('#contact-me').style.borderRadius = '10%';
            document.querySelector('#about-me').style.borderRadius = '';
            document.querySelector('#my-work').style.borderRadius = '';

        }, 1100);

    }

    loadMyWork(){

        let infoDiv = document.querySelector('#site-info-container');
        infoDiv.innerHTML = '';
        var xhttp = new XMLHttpRequest();
        xhttp.open("GET", 'site/assets/ajax-content/my-work.txt', true);
        xhttp.responseType = "text";
        xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;');
        xhttp.addEventListener('load',event=>{

            if (event.target.status >= 200 && event.target.status < 400) {

                let secHeader = document.createElement('h1');
                secHeader.id = `section-header`;
                secHeader.classList.add('section-header');
                infoDiv.appendChild(secHeader);

                let secInfo = document.createElement('div');
                secInfo.id = 'my-work-info';
                secInfo.classList.add('my-work-info');
                infoDiv.appendChild(secInfo);

                let contentArr = event.target.response.split('<break>');

                contentArr.map((content, i) => {

                    if (0 === i) {

                        content.split('').map((x, i) => {
                            setTimeout(() => {
                                let headerB = document.createElement('b');
                                let randColor = `rgba(${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 190)},${Math.floor(Math.random() * 256)},1)`;
                                headerB.style.color = randColor;
                                headerB.style.textShadow = `0px 2px 10px ${randColor}`;
                                headerB.innerHTML = x;
                                secHeader.appendChild(headerB);
                            }, (100 * i));
                        });
                    } else {
                        content.split('<brk>').map((links, index) => {

                         setTimeout(()=>{  
                            let clickText = Array(' : ', 'C','L','I','C','K', ' ', 'H','E','R','E');
                             let linkTxt = links.split('->');
                             let profDiv =  document.createElement('div');
                                    profDiv.id = 'prof-div'+index;
                                    profDiv.classList.add('prof-div');
                                let profName = document.createElement('span');
                                let profLink = document.createElement('a');
                                    profLink.target = '_blank';
                                    profLink.href = linkTxt[1];
            
                                 profDiv.appendChild(profName);
                                 profDiv.appendChild(profLink);
                                secInfo.appendChild(profDiv);

                            linkTxt[0].split('').map((x,indx)=>{

                                setTimeout(()=>{
                                    let profTxtB = document.createElement('b');
                                    let randColor = `rgba(${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 190)},${Math.floor(Math.random() * 256)},1)`;
                                    profTxtB.style.color = randColor;
                                    profTxtB.style.textShadow = `0px 1px 5px ${randColor}`;
                                    profTxtB.innerHTML = x;
                                    profName.appendChild(profTxtB);
                                }, (50*indx));

                            });

                            clickText.map((a,indx)=>{
                                setTimeout(()=>{
                                    let lnkTxtB = document.createElement('b');
                                    let randColor = `rgba(${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 190)},${Math.floor(Math.random() * 256)},1)`;
                                    lnkTxtB.style.color = randColor;
                                    lnkTxtB.style.textShadow = `0px 1px 5px ${randColor}`;
                                    lnkTxtB.innerHTML = a;
                                    profLink.appendChild(lnkTxtB);
                                }, (50*indx));
                            });
                        },(1000*(index+1)));
                    });
                    }

                });

            } else {
                alert(event.target.response);
            }
            
        });
       
        xhttp.addEventListener('error',event=>alert(event.type))
    

        xhttp.send();

        setTimeout(() => {
            document.querySelector('#contact-me').style.borderRadius = '';
            document.querySelector('#about-me').style.borderRadius = '';
            document.querySelector('#my-work').style.borderRadius = '10%';

        }, 1100);


    }

    requiredEventListener() {
        setTimeout(() => {
            document.querySelector('#about-me').addEventListener('click', () => this.loadAboutMe());
            document.querySelector('#contact-me').addEventListener('click', () => this.loadContactMe());
            document.querySelector('#my-work').addEventListener('click', () => this.loadMyWork());
        }, 1100);


    }



}
