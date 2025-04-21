document.querySelector("#initDetail").innerHTML = ""
document.querySelector("#initDetail").style.display = "none"
document.querySelector("#filters").style.display="none"
const showData = id =>{
    document.querySelector("#inTracker").style.display = "none"
    document.querySelector("#home").style.display = "none"
    document.querySelector("#monsters").style.display = "none"
    document.querySelector("#filters").style.display = "none"
    document.querySelector(`#${id}`).style.display = "block"
}
if(localStorage.getItem('page')==null){showData('home')}else{showData(localStorage.getItem('page'))}
document.querySelector("ul li:nth-of-type(1) a").addEventListener("click",()=>{
    showData('home')
    localStorage.setItem('page','home')
})
document.querySelector("ul li:nth-of-type(2) a").addEventListener("click",()=>{
    showData('inTracker')
    localStorage.setItem('page','inTracker')
    renderInitative()
})
document.querySelector("ul li:nth-of-type(3) a").addEventListener("click",()=>{
    showData('monsters')
    localStorage.setItem('page','monsters')
})
document.querySelector("#pFilters").addEventListener("click",()=>{
    showData("filters")
    localStorage.setItem('page','filters')
})
document.querySelector("#leaveFilters").addEventListener("click",()=>{
    showData("monsters")
    localStorage.setItem('page','monsters')
})
//Initative Tracker
document.querySelector("#deleteAll").addEventListener("click",()=>{
    if(confirm("Are you sure you want to delete all initative data?")){
        localStorage.removeItem('initative')
        localStorage.removeItem('initData')
        renderInitative()
    }
})
const InitativeOrder=[]
const renderInitative =(resetNumbers=false)=>{
    const InitativeOrder = [
    ]
    if(!localStorage.getItem('initative')){
    }
    if(localStorage.getItem("initative")&&resetNumbers==false){
        JSON.parse(localStorage.getItem("initative")).forEach(({intNumber,Name,Current})=>{
            InitativeOrder.push({Name,intNumber,Current})
        })
    }
    if(localStorage.getItem("initative")&&resetNumbers==true){
        JSON.parse(localStorage.getItem("initative")).forEach(({intNumber,Name,Current})=>{
            Current = intNumber
            InitativeOrder.push({Name,intNumber,Current})
        })}
    document.querySelector("ol").innerHTML = ''
    InitativeOrder.forEach(({intNumber,Name,Current})=>{
        const div = document.createElement("div")
        div.innerHTML = `<li style="display:inline" id="initLI${Name}">${Name} (${intNumber})</li><button style="margin-left:10px;"id=b${Name}>Delete</button>`
        div.style.order = `-${Current}`
        div.id = `initLIDivName${Name}`
        div.name = Name
        document.querySelector("ol").append(div)
        document.querySelector(`#initLI${Name}`).addEventListener("click",()=>{
            renderInitData(Name)
        })
        document.querySelector(`#b${Name}`).addEventListener('click',()=>{
            deleteInit(document.querySelector(`#initLIDivName${Name}`))
        })
})}
const renderInitData = name=>{
    let bool = false
    let sData = null
    const initDataArray = [
    ]
    if(localStorage.getItem("initData")){
        JSON.parse(localStorage.getItem("initData")).forEach(({fEname,data})=>{
            if(fEname == name){
                sData = data
            }
        })
    }
    document.querySelector("#initDetail").style.display = "block"
    document.querySelector("#inTracker").style.display = "none"
    const dataDiv = document.querySelector("#initDetail")
    if(sData){dataDiv.innerHTML = `<button id="back">Back</button><br><h1>${name}</h1><br><textarea style="80vw">${sData||""}</textarea>`}
    else{dataDiv.innerHTML = `<button id="back">Back</button><br><h1>${name}</h1><br><textarea style="80vw">${sData||""}</textarea>`}
    document.querySelector("#back").addEventListener("click",()=>{
        if(localStorage.getItem("initData")){
            JSON.parse(localStorage.getItem("initData")).forEach(({fEname,data})=>{
                if(fEname==name){
                    initDataArray.push({
                        "fEname":name,
                        "data":document.querySelector("textarea").value
                    })
                    bool = true
                }
                else{
                    initDataArray.push({"fEname":fEname,"data":data})
                }
            })
            if(!bool){
                initDataArray.push({
                    "fEname":name,
                    "data":document.querySelector("textarea").value
                })
            }
        }
        else{
            initDataArray.push({
                "fEname":name,
                "data":document.querySelector("textarea").value
            })
        }
        localStorage.setItem("initData",JSON.stringify(initDataArray))
        dataDiv.style.display="none"
        showData("inTracker")
    })
}
renderInitative()
const deleteInit = (parentElement)=>{
    const newInit = [
    ]
    JSON.parse(localStorage.getItem('initative')).forEach(({intNumber,Name,Current})=>{
        console.log(JSON.parse(localStorage.getItem('initative')))
    if(Name != parentElement.name){
        newInit.push({Name,intNumber,Current})
    }
    })
    console.log(newInit)
    localStorage.setItem('initative',JSON.stringify(newInit))
    console.log(JSON.parse(localStorage.getItem('initative')))
renderInitative()
}
document.querySelector("#initEnd").addEventListener("click",()=>{
    const json = JSON.parse(localStorage.getItem('initative'))
    let highest = {
        "Name":null,
        "Current":null,
        "intNumber":null
    }
    let lowCurrent = null
    const newOrder = [
    ]
    json.forEach(({Current,intNumber,Name})=>{
        if (highest.Current == null){
            highest.Name = Name
            highest.Current = Number(Current)
            highest.intNumber = Number(intNumber)
        }
        if(highest.Current < Number(Current)){
            highest.Name = Name
            highest.Current = Number(Current)
            highest.intNumber = Number(intNumber)
        }
        if(lowCurrent == null){lowCurrent = Number(Current)}
        if(lowCurrent>Number(Current)){lowCurrent = Number(Current)}
    })
    json.forEach(({intNumber,Current,Name})=>{
        if(highest.Name ==Name && highest.Current ==Current && toString(highest.Number) == toString(intNumber)){
            const data = {
                "Name":Name,
                "intNumber":Number(intNumber),
                "Current":Number(lowCurrent)
            }
            newOrder.push(data)
        }else{
            const old = {
                "Name":Name,
                "intNumber":intNumber,
                "Current":Number(Current-(-20))
            }
            newOrder.push(old)
        }
    })
    localStorage.setItem('initative',JSON.stringify(newOrder))
    renderInitative()
})
document.querySelector("#initAdd").addEventListener("click",()=>{
    if(document.querySelector("#initName").value){
        if(document.querySelector("#initInitiative").value){
            const addedInitative = {
                "Name":document.querySelector("#initName").value,
                "intNumber":document.querySelector("#initInitiative").value,
                "Current":document.querySelector("#initInitiative").value
            }
            InitativeOrder.push(addedInitative)
            localStorage.setItem("initative",JSON.stringify(InitativeOrder))
            renderInitative(true)
            document.querySelector("#initH1").style.display = "none"
        }
        else{
            document.querySelector("#initH1").textContent = "Initative Score Required"
            document.querySelector("#initH1").style.display = "block"
        }
    }else{
        document.querySelector("#initH1").textContent = "Name Required"
        document.querySelector("#initH1").style.display = "block"
    }

})



//Monsters
const getMonsters = async (url) => {
    console.log("Fetching Monster")
    const response = await fetch(url)
    const data = await response.json()
    return data
}
const AddText = (id,text)=>{
    document.querySelector(`#${id}`).textContent = ""
    document.querySelector(`#${id}`).textContent = " "+text
}
const ifAdd = (id,text,test,idRemoval)=>{
    document.querySelector(`#${id}`).innerHTML = ""
    if(test)AddText(id,text)
    if(!test||test=="—"||test=="false")document.querySelector(`#${idRemoval}`).innerHTML = ""
}
const arrayAdd = (array,divName)=>{
    if(array){
        array.forEach(({name,desc})=>{
            if(name&&desc){
            const span = document.createElement("span")
            const div = document.querySelector(`#${divName}`)
            span.innerHTML=`<em>${name} </em>${desc}<br><br>`
            div.append(span)
            }
        })
    }else{
        document.querySelector(`#${divName}`).innerHTML=""
    }
}
const renderMonster = ({bonus_actions,reactions,legendary_actions,legendary_desc,special_abilities,skills,languages,damage_vulnerabilities,damage_resistances,damage_immunities,senses,condition_immunities,wisdom,charisma,intelligence,constitution,strength,dexterity,speed,name,cr,type,alignment,actions,armor_class,armor_desc,desc,size,hit_points,hit_dice})=>{
    AddText("name",name)
    AddText("sizeAlign",(size+" "+type+", "+alignment))
    AddText("ac",(armor_class+" "+armor_desc))
    AddText("hp",(hit_points+" ("+hit_dice+")"))
    const {swim=null,burrow=null,walk=null,climb=null,fly=null} = speed
    const speedarray=[
        {"name":"swim","speed":swim},
        {"name":"fly","speed":fly},
        {"name":"burrow","speed":burrow},
        {"name":"walk","speed":walk},
        {"name":"climb","speed":climb}
    ]
    AddText("speed","")
    speedarray.forEach(({name,speed})=>{
        if(speed)AddText("speed",(document.querySelector("#speed").textContent +" "+speed + "ft. ("+name+"),"))    })
    const dexBonus = Number(Math.floor(-5-(-(dexterity/2))))
    const strBonus = Number(Math.floor(-5-(-(strength/2))))
    const conBonus = Number(Math.floor(-5-(-(constitution/2))))
    const intBonus = Number(Math.floor(-5-(-(intelligence/2))))
    const wisBonus = Number(Math.floor(-5-(-(wisdom/2))))
    const chaBonus = Number(Math.floor(-5-(-(charisma/2))))
    //AddText("rollinit",(" "+dexBonus))
    AddText("dexBonus",(dexterity+" ("+dexBonus+")"))
    AddText("strBonus",(strength+" ("+strBonus+")"))
    AddText("conBonus",(constitution+" ("+conBonus+")"))
    AddText("intBonus",(intelligence+" ("+intBonus+")"))
    AddText("wisBonus",(wisdom+" ("+wisBonus+")"))
    AddText("chaBonus",(charisma+" ("+chaBonus+")"))
    ifAdd("conImmune",condition_immunities,condition_immunities,"conImmuneDiv")
    ifAdd("dmgVul",damage_vulnerabilities,damage_vulnerabilities,"dmgVulDiv")
    ifAdd("dmgRes",damage_resistances,damage_resistances,"dmgResDiv")
    ifAdd("dmgImm",damage_immunities,damage_immunities,"dmgImmDiv")
    ifAdd("senses",senses,senses,"senDiv",)
    ifAdd("lang",languages,languages,"lanDiv")
    if(cr)AddText("cr",cr);
    arrayAdd(special_abilities,"special")
    arrayAdd(actions,"actions")
    arrayAdd(bonus_actions,"bActions")
    arrayAdd(reactions,"rActions")
    const {acrobatics,animal_handling,arcana,athletics,deception,history,religion,sleight_of_hand,stealth,survival,insight,intimidation,investigation,medicine,nature,perception,performance,persuasion,}=skills
    const skillsArray = [{"name":"Acrobatics","desc":acrobatics},{"name":"Animal Handling","desc":animal_handling},{"name":"Arcana","desc":arcana},{"name":"Athletics","desc":athletics},{"name":"Deception","desc":deception},{"name":"History","desc":history},{"name":"Insight","desc":insight},{"name":"Religion","desc":religion},{"name":"Sleight of Hand","desc":sleight_of_hand},{"name":"Stealth","desc":stealth},{"name":"Survival","desc":survival},{"name":"Intimidation","desc":intimidation},{"name":"Investigation","desc":investigation},{"name":"Medicine","desc":medicine},{"name":"Nature","desc":nature},{"name":"Perception","desc":perception},{"name":"Performance","desc":performance},{"name":"Persuasion","desc":persuasion}]
    arrayAdd(skillsArray,"skills")
    arrayAdd(legendary_actions,"lActions")
    ifAdd("legDesc",legendary_desc,legendary_actions,"legDesc")
    ifAdd("desc",desc,desc,"desc")
};
let data = null
let mn = 0
let page = 'https://api.open5e.com/v1/monsters/'
;(async()=>{
    data = await getMonsters('https://api.open5e.com/v1/monsters/')
    renderMonster(data.results[0])
    console.log("Completed first load")
})();
const buttons = [{id:"nTop",which:"n"},{id:"nBottom",which:"n"},{id:"pTop"},{id:"pBottom"}]
buttons.forEach(({id,which="p"})=>{
    document.querySelector(`#${id}`).addEventListener("click",async ()=>{
        let text = document.querySelector(`#${id}`).textContent
        document.querySelector(`#${id}`).textContent = "Searching"
        if(which=="n")mn=mn-(-1)
            else{mn=mn-1}
        //if(mn==50){
        //    mn=0
       //     page=data.next
            //data=null
       // }
        //if(mn==-1){
        //    mn=49
        //    page=data.previous
            //data=null
        //}
        if(page==null){page='https://api.open5e.com/v1/monsters/'}
        softReload()
        if(data==null)data = await getMonsters(page)
        let boolSearch = true
        let selectedMonster = null
        let boolData = true
        let boolFilters = false
        let boolRender = true
        while(boolSearch){
            try{
            //if(document.querySelector("#pageNumber").value && document.querySelector("#pageNumber").value > 0){page='https://api.open5e.com/v1/monsters/?page='+document.querySelector("#pageNumber").value}
            selectedMonster = data.results[mn]
                if(mn<50 && mn>-1){boolFilters = checkFilters(selectedMonster)}
            console.log("Number: "+mn+" Page: "+page)
            }
            catch(ex){
                console.log("Error getting #"+mn+" from "+page)
                console.log(ex)
                console.log(data)
                //boolRender = false
            }
            //if(mn==7&&page=='https://api.open5e.com/v1/monsters/?page=65'){boolRender=false}
            //if(boolRender==false){break;}
            if(boolFilters&&(mn>-1&&mn<50)){
                boolSearch = false
            }
            else{
                if(mn==50||(mn==7&&page=='https://api.open5e.com/v1/monsters/?page=65')){
                    mn=0
                    if(data.next){
                    page=data.next
                    data=await getMonsters(page)
                    }
                    else{
                        page='https://api.open5e.com/v1/monsters/'
                        data=await getMonsters(page)
                    }
                    //data=null
                }
                if(mn==-1){
                    if(data.previous){
                    page=data.previous
                    mn=49
                    data=await getMonsters(page)
                    }
                    else{
                        page='https://api.open5e.com/v1/monsters/?page=65'
                        mn=6
                        data=await getMonsters(page)
                    }
                    //data=null
                }
                if(which=="n"){
                     mn=mn-(-1)
                 }
                 else{
                     mn=mn-1
                 }
            }
            boolData = true
        }
        document.querySelector("#information p:first-of-type").textContent = mn
        if(page!=null&&page!=document.querySelector("#information p:nth-of-type(2)").textContent){
            document.querySelector("#information p:nth-of-type(2)").textContent = page
            console.log(data)
        }
        console.log(selectedMonster)
        renderMonster(selectedMonster)
        document.querySelector(`#${id}`).textContent = text
    })})
const checkFilters=({environments,bonus_actions,reactions,legendary_actions,special_abilities,skills,languages,damage_vulnerabilities,damage_resistances,damage_immunities,senses,condition_immunities,speed,name,cr,type,alignment,actions,armor_class,size,hit_points})=>{
    let boolFilter = true
    if(!getFilter("leg_act",legendary_actions,"checkbox")){boolFilter=false};
    if(!getFilter("inputsCR",cr,'minMaxNumber')){boolFilter=false};
    //if(document.querySelector("#env").value){if(!getFilter("env",environments,"inArray",document.querySelector("#env").value)){boolFilter=false}}
    if(document.querySelector("#env").value){if(!getFilter("env",environments,"inArray",document.querySelector("#env").value)){boolFilter=false}};
    if(document.querySelector("#spec").value){if(!getFilter("spec",special_abilities,"inArray",document.querySelector("#spec").value,"name")){boolFilter=false}};
    if(document.querySelector("#type").value){if(!getFilter("type",type,"match",document.querySelector("#type").value)){boolFilter = false;}};
    if(document.querySelector("#filterName").value){if(!getFilter("filterName",name,"contains",0)){boolFilter = false;}}
    return boolFilter
}
let boolIndividualFilter = false
const getFilter=(id,attribute,filterType="default",findAttribute)=>{
    if(document.querySelector(`#${id}`)){
        switch(filterType){
        case "checkbox":{
            if(document.querySelector(`#${id}`).checked){
                if(attribute){
                    return true
                }else{
                    return false
                }
            }else{return true}
            }
        case "match":{
            if(attribute == document.querySelector(`#${id}`).value){
                return true
            }
            return false
        }
        case "minMaxNumber":{
            min = document.querySelector(`#${id} input:first-of-type`).value == '' ? 0:document.querySelector(`#${id} input:first-of-type`).value
            max = document.querySelector(`#${id} input:last-of-type`).value == '' ? 100:document.querySelector(`#${id} input:last-of-type`).value
            if(min <= attribute && max >= attribute){
                return true
            }
            else{
                return false;
            }
        }
        case "inArray":{
            boolIndividualFilter = false
            /*const count =-1;
            attribute.forEach(a=>{
                if(a==findAttribute){return false}
                count++
            })
            if(count>=1){return true}
            else{
                return false;
            }*/
           if(attribute){
           attribute.forEach(a=>{
                if(a.name){
                    if(a.name==findAttribute){boolIndividualFilter=true}
                }
                else{
                    if(a==findAttribute){boolIndividualFilter = true}
                }
           })
           if(boolIndividualFilter){return true}
           else{return false}
        }else{
            return false
        }
        }
        case "contains":{
            if(attribute.toUpperCase().includes(document.querySelector(`#${id}`).value.toUpperCase())){
                return true;
            }else{
                return false;
            }
        }
        case "default":{
            return true
        }
    }}else return true;
}
const softReload =()=>{
    document.querySelector("#monLeft").innerHTML = '<h1 id="name"></h1><span id="sizeAlign"></span><hr><em>Armor Class</em><span id="ac"></span><br><em>Hit Points</em><span id="hp"></span><br><em>Speed</em><span id="speed"></span><br><hr><div class="gridarea"><div>STR<br><span id="strBonus"></span></div><div>DEX<br><span id="dexBonus"></span></div><div>CON<br><span id="conBonus"></span></div><div>INT<br><span id="intBonus"></span></div><div>WIS<br><span id="wisBonus"></span></div><div>CHA<br><span id="chaBonus"></span></div></div><hr><div><div id="dmgVulDiv"><em>Damage Vulnerabilities</em><span id="dmgVul"></span><br></div><div id="dmgResDiv"><em>Damage Resistances</em><span id="dmgRes"></span><br></div><div id="dmgImmDiv"><em>Damage Immunities</em><span id="dmgImm"></span><br></div><div id="conImmuneDiv"><em>Condition Immunities</em><span id="conImmune"></span><br></div><div id="senDiv"><em>Senses</em><span id="senses"></span><br></div><div id="lanDiv" style="float:left;"><em>Languages</em><span id="lang"></span></div><br><em>Skills</em><div id="skills"></div><em>Challenge</em><span id="cr"> 0</span><hr><span id="special"></span>'
    document.querySelector("#monRight").innerHTML = '<div id="actions"><em>Actions<br></em></div><div id="bActions"><em>Bonus Actions<br></em></div><div id="rActions"><em>Reactions<br></em></div><span id="legDesc"><em>Legendary Actions</em></span><div id="lActions"></div>'
}
