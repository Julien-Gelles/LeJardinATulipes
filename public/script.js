document.addEventListener("DOMContentLoaded", () => {
    const WATERTIME = 3600;
    let tulipState = 0;
    let tulip;
    let pointX = 300;
  
    let navigator_info = window.navigator;
    let screen_info = window.screen;
    let uid = navigator_info.mimeTypes.length;
    uid += navigator_info.userAgent.replace(/\D+/g, "");
    uid += navigator_info.plugins.length;
    uid += screen_info.height || "";
    uid += screen_info.width || "";
    uid += screen_info.pixelDepth || "";
  
    let socket = io();
    let transitTulipes;
  
    let add = document.getElementById("add");
    let addstatus = 0;
    let water = document.getElementById("water");
    let buttonhr = document.getElementById("button-hr");
  
    let your = document.getElementById("your");
    let yourcontent = document.getElementById("your-content");
    let yourhr = document.getElementById("your-hr");
    let yourstatus = true;
  
    let selected = document.getElementById("selected");
    let selectedcontent = document.getElementById("selected-content");
    let selectedhr = document.getElementById("selected-hr");
    let selectedstatus = true;
    let selectedTulip = 0;
  
    water.style.display = "none";
    your.style.display = "none";
    yourcontent.style.display = "none";
    yourhr.style.display = "none";
    selected.style.display = "none";
    selectedcontent.style.display = "none";
    selectedhr.style.display = "none";
  
    your.addEventListener("click", () => {
      if (yourstatus) {
        yourcontent.style.display = "none";
        yourstatus = false;
      } else {
        yourcontent.style.display = "block";
        yourstatus = true;
      }
    });
    selected.addEventListener("click", () => {
      if (selectedstatus) {
        selectedcontent.style.display = "none";
        selectedstatus = false;
      } else {
        selectedcontent.style.display = "block";
        selectedstatus = true;
      }
    });
  
    water.addEventListener("click", () => {
      socket.emit("addTimer", uid);
    });
    add.addEventListener("click", () => {
      if (tulipState == 0) {
        document.getElementById("addText").innerHTML = "Place This Tulip";
  
        tulip = document.createElement("img");
        let coord = pointX * -1 + 300;
        tulip.setAttribute(
          "src",
          "https://cdn.glitch.global/8c20220c-af71-4768-a86a-e5f46714c3b4/tulipe.png?v=1677883683788"
        );
        if (coord < 0) {
          tulip.setAttribute("style", "left: 0px;");
        } else if (coord > 2900) {
          tulip.setAttribute("style", "left: 2925px;");
        } else {
          tulip.setAttribute("style", "left: " + coord + "px;");
        }
        tulip.setAttribute("id", "cible");
        document.getElementById("rectlimit2").appendChild(tulip);
        new oWdgCursor("cible", "rectlimit2");
        tulipState = 1;
      } else if (tulipState == 1) {
        document.getElementById("loadingScreen").style.display = "block";
        document.getElementById("loading").style.display = "flex";
      }
    });
    document.addEventListener("dblclick", () => {
      if (tulipState == 1) {
        document.getElementById("loadingScreen").style.display = "block";
        document.getElementById("loading").style.display = "flex";
      }
    });
  
    document.getElementById("buttonForm").addEventListener("click", () => {
      document.getElementById("loadingScreen").style.display = "none";
      document.getElementById("loading").style.display = "none";
  
      document.getElementById("addText").innerHTML = "Add a Tulip";
      add.style.display = "none";
      water.style.display = "block";
      socket.emit("addTulPush", {
        name: document
          .getElementById("textForm")
          .value.replace(/[^a-z0-9-_.ïéèà]/gi, "-"),
        x: tulip.offsetLeft,
        y: tulip.offsetTop,
        user: uid,
      });
      tulipState = 0;
      tulip.remove();
    });
  
    function addClickEvent(e) {
      selectedTulip = e.target.id;
      selected.style.display = "block";
      selectedcontent.style.display = "block";
      selectedhr.style.display = "block";
    }
  
    let mouseMoveX;
    let mouseMoveY;
  
    document.addEventListener("mousedown", (e) => {
      mouseMoveX = e.pageX;
      mouseMoveY = e.pageY;
    });
  
    document.addEventListener("mouseup", (e) => {
      if (e.pageX == mouseMoveX && e.pageY == mouseMoveY) {
        let targ = e.target.className;
        if (targ == "main_box" || targ == "rectlimit2" || targ == "rectlimit") {
          selectedTulip = 0;
          selected.style.display = "none";
          selectedcontent.style.display = "none";
          selectedhr.style.display = "none";
        }
      }
    });
  
    document.getElementById("yourVisible").addEventListener("change", (e) => {
      if (e.currentTarget.checked) {
        document.getElementById(uid).style.outline = "1px solid rgb(200,50,50)";
      } else {
        document.getElementById(uid).style.outline = "none";
      }
    });
    document.getElementById("selectedVisible").addEventListener("change", (e) => {
      if (e.currentTarget.checked) {
        document.getElementById(selectedTulip).style.outline =
          "1px solid rgb(50,50,200)";
      } else {
        document.getElementById(selectedTulip).style.outline = "none";
      }
    });
  
    function addTulipe(value, key, time) {
      let newtul = document.createElement("img");
      switch (true) {
        case time >= 0 && time < 20:
          newtul.setAttribute(
            "src",
            "https://cdn.glitch.global/8c20220c-af71-4768-a86a-e5f46714c3b4/tulipe.png?v=1677883683788"
          );
          break;
        case time >= 20 && time < 40:
          newtul.setAttribute(
            "src",
            "https://cdn.glitch.global/8c20220c-af71-4768-a86a-e5f46714c3b4/tulipe2.png?v=1677883687574"
          );
          break;
        case time >= 40 && time < 60:
          newtul.setAttribute(
            "src",
            "https://cdn.glitch.global/8c20220c-af71-4768-a86a-e5f46714c3b4/tulipe3.png?v=1677883691290"
          );
          break;
        default:
          newtul.setAttribute(
            "src",
            "https://cdn.glitch.global/8c20220c-af71-4768-a86a-e5f46714c3b4/tulipe.png?v=1677883683788"
          );
          break;
      }
      newtul.setAttribute("id", key);
      newtul.setAttribute("class", "tul");
      let coord =
        "left: " + value.xaxe + "px; top: " + (value.yaxe + 220) + "px;";
      newtul.setAttribute("style", coord);
      newtul.addEventListener("mouseup", addClickEvent);
      newtul.onmousedown = function (e) {
        e.preventDefault();
      };
      let visibleY = document.getElementById("yourVisible").checked;
      let visibleS = document.getElementById("selectedVisible").checked;
  
      if (key == selectedTulip && visibleS) {
        newtul.style.outline = "1px solid rgb(50,50,200)";
      } else if (key == uid && visibleY) {
        newtul.style.outline = "1px solid rgb(200,50,50)";
      } else {
        newtul.style.outline = "none";
      }
      document.getElementById("zoom").appendChild(newtul);
    }
    function suppTulipes() {
      let imgs = document.getElementsByClassName("tul");
      for (var i = 0; i < imgs.length; i++) {
        imgs.item(i).remove();
      }
    }
    function secondsToHms(d) {
      d = Number(d);
      var h = Math.floor(d / 3600);
      var m = Math.floor((d % 3600) / 60);
      var s = Math.floor((d % 3600) % 60);
  
      var hDisplay = h > 0 ? h + "h " : "";
      var mDisplay = m > 0 ? m + "m " : "";
      var sDisplay = s > 0 ? s + "s" : "";
      return hDisplay + mDisplay + sDisplay;
    }
  
    socket.on("drawTuls", (datas) => {
      transitTulipes = new Map(JSON.parse(datas[0]));
      suppTulipes();
      transitTulipes.forEach((value, key) => {
        addTulipe(
          value,
          key,
          Math.round((datas[1] - transitTulipes.get(key).date) / 1000)
        );
      });
  
      if (transitTulipes.has(uid)) {
        if (Math.round((datas[1] - transitTulipes.get(uid).water) / 1000) >= WATERTIME) {
          document.getElementById("waterOff").style.display = "none";
          document.getElementById("waterText").innerHTML = "Water your Tulip";
        } else {
          document.getElementById("waterOff").style.display = "block";
          document.getElementById("waterText").innerHTML =
            "Water your Tulip - " +
            secondsToHms(
              WATERTIME - Math.round((datas[1] - transitTulipes.get(uid).water) / 1000)
            );
        }
        add.style.display = "none";
        water.style.display = "block";
        document.getElementById("secondsLeft").innerHTML = secondsToHms(
          Math.round(
            transitTulipes.get(uid).life -
              (datas[1] - transitTulipes.get(uid).date) / 1000
          )
        );
        document.getElementById("secondsTime").innerHTML = secondsToHms(
          Math.round((datas[1] - transitTulipes.get(uid).date) / 1000)
        );
        document.getElementById("tulipName").innerHTML =
          transitTulipes.get(uid).name;
        let time = Math.round((datas[1] - transitTulipes.get(uid).date) / 1000);
        switch (true) {
          case time >= 0 && time < 20:
            document.getElementById("tulipPic").src =
              "https://cdn.glitch.global/8c20220c-af71-4768-a86a-e5f46714c3b4/tulipe.png?v=1677883683788";
            break;
          case time >= 20 && time < 40:
            document.getElementById("tulipPic").src =
              "https://cdn.glitch.global/8c20220c-af71-4768-a86a-e5f46714c3b4/tulipe2.png?v=1677883687574";
            break;
          case time >= 40 && time < 60:
            document.getElementById("tulipPic").src =
              "https://cdn.glitch.global/8c20220c-af71-4768-a86a-e5f46714c3b4/tulipe3.png?v=1677883691290";
            break;
          default:
            document.getElementById("tulipPic").src =
              "https://cdn.glitch.global/8c20220c-af71-4768-a86a-e5f46714c3b4/tulipe.png?v=1677883683788";
            break;
        }
        your.style.display = "block";
        if (yourstatus) {
          yourcontent.style.display = "block";
          yourhr.style.display = "block";
        }
      } else if (tulipState != 1) {
        add.style.display = "block";
        water.style.display = "none";
        document.getElementById("secondsLeft").innerHTML = "0";
        your.style.display = "none";
        yourcontent.style.display = "none";
        yourhr.style.display = "none";
        yourstatus = true;
      }
  
      if (transitTulipes.has(selectedTulip)) {
        document.getElementById("secondsLeftS").innerHTML = secondsToHms(
          Math.round(
            transitTulipes.get(selectedTulip).life -
              (datas[1] - transitTulipes.get(selectedTulip).date) / 1000
          )
        );
        document.getElementById("secondsTimeS").innerHTML = secondsToHms(
          Math.round((datas[1] - transitTulipes.get(selectedTulip).date) / 1000)
        );
        document.getElementById("tulipNameS").innerHTML =
          transitTulipes.get(selectedTulip).name;
        let time = Math.round(
          (datas[1] - transitTulipes.get(selectedTulip).date) / 1000
        );
        switch (true) {
          case time >= 0 && time < 20:
            document.getElementById("tulipPicS").src =
              "https://cdn.glitch.global/8c20220c-af71-4768-a86a-e5f46714c3b4/tulipe.png?v=1677883683788";
            break;
          case time >= 20 && time < 40:
            document.getElementById("tulipPicS").src =
              "https://cdn.glitch.global/8c20220c-af71-4768-a86a-e5f46714c3b4/tulipe2.png?v=1677883687574";
            break;
          case time >= 40 && time < 60:
            document.getElementById("tulipPicS").src =
              "https://cdn.glitch.global/8c20220c-af71-4768-a86a-e5f46714c3b4/tulipe3.png?v=1677883691290";
            break;
          default:
            document.getElementById("tulipPicS").src =
              "https://cdn.glitch.global/8c20220c-af71-4768-a86a-e5f46714c3b4/tulipe.png?v=1677883683788";
            break;
        }
      } else {
        selected.style.display = "none";
        selectedcontent.style.display = "none";
        selectedhr.style.display = "none";
      }
    });
    socket.on("error", (err) => {
      switch (err) {
        case 0:
          alert("Your tulip is still on grass ! oO");
          break;
  
        default:
          alert(
            "The maximum amount of tulip (" +
              err +
              ") has been reached - sadge ;("
          );
          break;
      }
    });
    let targ;
    let panning = false,
      start = { x: 0 },
      zoom = document.getElementById("zoom");
  
    function setTransform() {
      zoom.style.transform = "translate(" + pointX + "px)";
      zoom.style.transform = "translate(" + pointX + "px, -50%)";
    }
  
    document.onmousedown = function (e) {
      targ = e.target.id;
      start = { x: e.clientX - pointX };
      panning = true;
    };
  
    document.onmouseup = function (e) {
      panning = false;
    };
  
    document.onmousemove = function (e) {
      if (
        !panning ||
        (targ != "rectlimit2" && targ != "rectlimit" && !/^\d+$/.test(targ))
      ) {
        return;
      }
      pointX = e.clientX - start.x;
      setTransform();
    };
    setTransform();
  
    let oWdgCursor = function (sElement, sLimite) {
      this.oLimite = null;
      this.oElement = null;
      this.oLimite = document.getElementById(sLimite);
      this.bDrag = false;
      this.bError = false;
      this.sClassDrag = "oWdgCursorDrag";
      this.oPos = { x: 0, y: 0 };
      this.moveDiv = this.moveDiv.bind(this);
      this.getBoundingLimite = function () {
        if (this.oLimite == document.documentElement) {
          return {
            width: window.innerWidth,
            height: window.innerHeight,
            top: this.oLimite.offsetTop,
            left: this.oLimite.offsetLeft,
          };
        }
        return this.oLimite.getBoundingClientRect();
      };
      /**
       * Initialise les evenements
       */
      this.init = function (sLimite, sElement) {
        this.oElement = document.getElementById(sElement);
        this.oLimite =
          sLimite === undefined
            ? document.documentElement
            : document.getElementById(sLimite);
        if (this.oElement == null || this.oLimite == null) {
          return true;
        }
        this.oElement.addEventListener("mousedown", this.moveDiv);
        this.oElement.addEventListener("touchstart", this.moveDiv);
        return false;
      };
  
      this.bError = this.init(sLimite, sElement);
    };
  
    oWdgCursor.prototype.moveDiv = function (oEvent) {
      oEvent.preventDefault();
      if (oEvent.type == "touchstart" || oEvent.type == "mousedown") {
        this.bDrag = true;
        let oTouch = oEvent,
          oRect = this.oElement.getBoundingClientRect();
        if (oEvent.type == "touchstart") {
          oTouch = null;
          if (oEvent.targetTouches.length > 0) {
            for (let i = 0; i < oEvent.targetTouches.length; i++) {
              if (oEvent.targetTouches[i].target == this.oElement) {
                oTouch = oEvent.targetTouches[i];
                break;
              }
            }
          }
          if (oTouch == null) {
            return;
          }
        }
        this.oPos = {
          left: oTouch.clientX - oRect.left,
          top: oTouch.clientY - oRect.top,
        };
        document.addEventListener("mouseup", this.moveDiv);
        this.oElement.addEventListener("mouseup", this.moveDiv);
        document.addEventListener("touchend", this.moveDiv);
  
        document.addEventListener("mousemove", this.moveDiv);
        document.addEventListener("touchmove", this.moveDiv);
      } else if (oEvent.type == "touchend" || oEvent.type == "mouseup") {
        this.bDrag = false;
        this.oElement.classList.remove(this.sClassDrag);
        document.removeEventListener("mousemove", this.moveDiv);
        document.removeEventListener("touchmove", this.moveDiv);
        document.removeEventListener("mouseup", this.moveDiv);
        document.removeEventListener("touchend", this.moveDiv);
        this.oElement.removeEventListener("mouseup", this.moveDiv);
      } else if (oEvent.type == "touchmove" || oEvent.type == "mousemove") {
        let oTouch = oEvent;
  
        if (oEvent.type == "touchmove") {
          oTouch = null;
          if (oEvent.targetTouches.length > 0) {
            for (let i = 0; i < oEvent.targetTouches.length; i++) {
              if (oEvent.targetTouches[i].target == this.oElement) {
                oTouch = oEvent.targetTouches[i];
                break;
              }
            }
          }
          if (oTouch == null) {
            return;
          }
        }
        if (this.bDrag == true) {
          this.oElement.classList.add(this.sClassDrag);
          let oRect = this.getBoundingLimite(),
            iWidth = this.oElement.offsetWidth,
            iHeight = this.oElement.offsetHeight,
            iClientX = oTouch.clientX - oRect.left - this.oPos.left,
            iClientY = oTouch.clientY - oRect.top - this.oPos.top;
          if (iClientX < 0) {
            iClientX = 0;
          } else if (iClientX + iWidth > oRect.width) {
            iClientX = oRect.width - iWidth;
          }
          if (iClientY < 0) {
            iClientY = 0;
          } else if (iClientY + iHeight > oRect.height) {
            iClientY = oRect.height - iHeight;
          }
          this.oElement.style.left = iClientX + "px";
          this.oElement.style.top = iClientY + "px";
        } else {
          this.oElement.classList.remove(this.sClassDrag);
        }
      }
    };
  });
  