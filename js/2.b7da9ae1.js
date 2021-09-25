(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[2],{"13ec":function(e,t,a){"use strict";a("9a54")},"4a10":function(e,t,a){"use strict";var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("q-scroll-observer",{on:{scroll:e.onScroll}})},s=[],r={name:"PageScrollPositionHandler",props:{listen:{type:Boolean},page:{type:String,required:!0},extra:{type:Object,default:()=>{}}},methods:{onScroll(e){["up","down"].includes(e.direction)&&this.listen&&(this.$emit("scroll",e.position),this.$store.dispatch("quran/setPageScrollPosition",{page:this.page,offsetTop:e.position,extra:this.extra}))}}},n=r,o=a("2877"),l=a("ed5e"),c=a("eebe"),u=a.n(c),h=Object(o["a"])(n,i,s,!1,null,null,null);t["a"]=h.exports;u()(h,"components",{QScrollObserver:l["a"]})},"4abc":function(e,t,a){"use strict";a("5473")},5473:function(e,t,a){},"9a54":function(e,t,a){},a661:function(e,t,a){"use strict";var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"to-top"},[a("q-scroll-observer",{on:{scroll:e.onScroll}}),a("q-page-sticky",{staticStyle:{"z-index":"10"},attrs:{position:"bottom-right",offset:[18,18]}},[a("transition",{attrs:{appear:"","enter-active-class":"animated fadeIn","leave-active-class":"animated fadeOut"}},[e.show?a("q-btn",{attrs:{color:"primary",icon:"expand_less","fab-mini":""},on:{click:function(t){return e.toTop()}}}):e._e()],1)],1)],1)},s=[],r={name:"ToTop",data(){return{show:!1}},watch:{show:{immediate:!0,handler(e){this.$emit("show",e)}}},methods:{onScroll(e){e.position>900?this.show=!0:this.show=!1},toTop(){const e=document.getElementsByTagName("body")[0];this.scrollToElement(e)}}},n=r,o=a("2877"),l=a("ed5e"),c=a("de5e"),u=a("9c40"),h=a("eebe"),p=a.n(h),d=Object(o["a"])(n,i,s,!1,null,null,null);t["a"]=d.exports;p()(d,"components",{QScrollObserver:l["a"],QPageSticky:c["a"],QBtn:u["a"]})},d942:function(e,t,a){"use strict";a.r(t);var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"quran-reader-detail"},[a("q-header",{ref:"header",staticClass:"bg-transparent"},[a("q-toolbar",{ref:"toolbar",staticClass:"bg-white text-black q-py-sm"},[a("q-btn",{attrs:{icon:"arrow_back",flat:"",round:"",dense:""},on:{click:function(t){return e.$router.go(-1)}}}),a("q-item",{staticClass:"q-py-sm q-px-sm",attrs:{clickable:""},on:{click:function(t){e.showSurahChangerDialog=!0}}},[a("q-item-section",[a("q-item-label",[e._v(e._s(e.surah.nameSimple))]),a("q-item-label",{attrs:{caption:""}},[e._v("\n            "+e._s(e.normalizeSurahNameTranslation(e.surah.nameTranslated))+",\n            "+e._s(e.surah.versesCount)+" ayat\n          ")])],1)],1),a("q-space"),a("q-btn",{attrs:{flat:"",round:"",dense:"",icon:e.readingMode?"menu_book":"import_contacts"},on:{click:function(t){e.readingMode=!e.readingMode}}}),a("q-btn",{attrs:{icon:"mdi-dots-vertical",flat:"",round:"",dense:""},on:{click:function(t){e.showMenuMoreDialog=!0}}})],1),a("q-separator")],1),e.surah?a("keep-alive",[a(e.quranDetailComponent,{ref:"quranDetail",tag:"component",attrs:{"surah-id":e.surahId,"offset-top":e.offsetTop,"verse-key":e.verseKey,"header-height":e.headerHeight,surah:e.surah,pages:e.surah.pages,"active-page":e.activePage}})],1):e._e(),a("surah-changer-dialog",{attrs:{show:e.showSurahChangerDialog,"active-surah-id":e.surahId},on:{"update:show":function(t){e.showSurahChangerDialog=t},"item-click":e.onSurahChanged}}),a("q-dialog",{attrs:{position:"bottom"},model:{value:e.showMenuMoreDialog,callback:function(t){e.showMenuMoreDialog=t},expression:"showMenuMoreDialog"}},[a("q-card",{staticClass:"full-width"},[a("q-card-section",{staticClass:"row items-center q-pb-none"},[a("div",{staticClass:"text-h6"},[e._v("Lainnya")]),a("q-space"),a("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{icon:"close",flat:"",round:"",dense:""}})],1),a("q-list",{attrs:{separator:"",padding:""}},[a("q-item",{directives:[{name:"ripple",rawName:"v-ripple"},{name:"close-popup",rawName:"v-close-popup"}],attrs:{clickable:""},on:{click:function(t){return e.prepareAyahChange()}}},[a("q-item-section",{attrs:{avatar:""}},[a("q-icon",{attrs:{name:"mdi-priority-low"}})],1),a("q-item-section",[e._v("Pergi ke nomor ayat")])],1),a("q-item",{directives:[{name:"ripple",rawName:"v-ripple"},{name:"close-popup",rawName:"v-close-popup"}],attrs:{clickable:""},on:{click:function(t){e.showSurahChangerDialog=!0}}},[a("q-item-section",{attrs:{avatar:""}},[a("q-icon",{attrs:{name:"mdi-format-list-text"}})],1),a("q-item-section",[e._v("Pindah surah")])],1),a("q-item",{directives:[{name:"ripple",rawName:"v-ripple"},{name:"close-popup",rawName:"v-close-popup"}],attrs:{clickable:""},on:{click:function(t){e.showSettingsDialog=!0}}},[a("q-item-section",{attrs:{avatar:""}},[a("q-icon",{attrs:{name:"mdi-tune"}})],1),a("q-item-section",[e._v("Pengaturan")])],1)],1)],1)],1),a("quran-reader-detail-settings-dialog",{attrs:{show:e.showSettingsDialog},on:{"update:show":function(t){e.showSettingsDialog=t}}})],1)},s=[],r=(a("5319"),function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"quran-reader-detail-list-mode"},[a("page-scroll-position-handler",{attrs:{listen:!e.init&&e.active,page:e.page,extra:e.scrollExtra},on:{scroll:function(t){return e.activeOffsetTop=t}}}),e.$store.state.quran.loading.fetchSurah?a("quran-reader-detail-skeleton"):[a("div",{staticClass:"content bg-white",style:e.contentStyles},[e.surah.bismillahPre?a("div",{staticClass:"text-basmalah text-center q-py-md",staticStyle:{"font-size":"22pt"}},[e._v("\n        "+e._s(e.basmalahArabic)+"\n      ")]):e._e(),a("q-list",{attrs:{separator:""}},e._l(e.surah.ayahs,(function(t,i){return a("q-item",{key:t.verse_key,ref:t.verse_key,refInFor:!0,staticClass:"q-pt-md"},[a("q-item-section",[a("q-item-label",{staticClass:"text-arabic text-right"},[e._v("\n              "+e._s(t.text_uthmani)+"\n              "),a("span",{staticClass:"text-arabic-number q-mr-xs",domProps:{innerHTML:e._s(e.arabicNumber(t.verse_number))}})]),a("q-item-label",{staticClass:"q-pt-sm translation-wrap"},[a("span",[e._v(e._s(t.verse_number+". "))]),a("span",{domProps:{innerHTML:e._s(e.surah.translations[i].text)}})]),a("q-item-label",{staticClass:"q-pt-sm row justify-end"},[a("q-btn",{attrs:{size:"sm",color:e.isAyahPlaying(t.verse_number)?"primary":"grey-3","text-color":e.isAyahPlaying(t.verse_number)?"":"black",icon:e.isAyahPlaying(t.verse_number)?"mdi-stop-circle-outline":"mdi-motion-play-outline",round:"",unelevated:""},on:{click:function(a){return e.onAyahPlayClicked(t.verse_number)}}}),a("q-btn",{staticClass:"q-ml-sm",attrs:{size:"sm",icon:"mdi-dots-vertical-circle-outline",color:"grey-3","text-color":"black",round:"",unelevated:""},on:{click:function(a){return e.onOptionClicked(t,e.surah.translations[i])}}})],1)],1)],1)})),1)],1)],a("ayah-options-dialog",{attrs:{show:e.showAyahOptionsDialog,"ayah-number":e.ayahOptionsDialogData.ayahNumber,"surah-name":e.ayahOptionsDialogData.surahName,arabic:e.ayahOptionsDialogData.arabic,translation:e.ayahOptionsDialogData.translation},on:{"update:show":function(t){e.showAyahOptionsDialog=t}}}),a("ayah-play-options-dialog",{attrs:{show:e.showAyahPlayOptionsDialog,"ayah-number":e.ayahPlayOptionsDialogData.ayahNumber},on:{"update:show":function(t){e.showAyahPlayOptionsDialog=t},"item-click":e.onAyahPlay}}),e.surah?a("ayah-play-bottom-control",{attrs:{show:e.player.playing,"surah-name":e.surah.nameSimple,"ayah-number":e.player.currentAyah},on:{stop:function(t){return e.stopAudio()}}}):e._e(),e.surah?a("ayah-changer-dialog",{attrs:{show:e.showAyahChangerDialog,"surah-id":e.surahId,"verses-count":e.surah.versesCount},on:{"update:show":function(t){e.showAyahChangerDialog=t},"item-click":e.onAyahChange}}):e._e(),a("to-top",{directives:[{name:"show",rawName:"v-show",value:!e.player.playing,expression:"!player.playing"}],on:{show:function(t){return e.toTopShown=t}}})],2)}),n=[],o=(a("4d90"),a("ded3")),l=a.n(o),c=a("2f62"),u=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"quran-reader-detail-skeleton"},[a("div",{staticClass:"bg-white",staticStyle:{"min-height":"100vh"}},[a("q-list",e._l(10,(function(t){return a("div",{key:t},[a("q-item",{staticClass:"q-py-md"},[a("q-item-section",[a("q-item-label",{staticClass:"text-right"},[a("q-skeleton",{attrs:{type:"text",height:"30px"}})],1),a("q-item-label",{staticClass:"q-pt-sm"},[a("q-skeleton",{attrs:{type:"text"}}),a("q-skeleton",{attrs:{type:"text",width:"75%"}})],1)],1),a("q-item-section",{staticClass:"q-mt-sm",attrs:{side:"",top:""}},[a("q-skeleton",{attrs:{type:"circle",size:"16px"}})],1)],1),10!=t?a("q-separator",{attrs:{color:"grey-3"}}):e._e()],1)})),0)],1)])},h=[],p=a("2877"),d=a("1c1c"),m=a("66e5"),y=a("4074"),g=a("0170"),b=a("293e"),w=a("eb85"),v=a("eebe"),f=a.n(v),q={},S=Object(p["a"])(q,u,h,!1,null,null,null),k=S.exports;f()(S,"components",{QList:d["a"],QItem:m["a"],QItemSection:y["a"],QItemLabel:g["a"],QSkeleton:b["a"],QSeparator:w["a"]});var C=a("fb63"),x=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("q-dialog",{model:{value:e.showDialog,callback:function(t){e.showDialog=t},expression:"showDialog"}},[a("q-card",{staticClass:"bg-primary",staticStyle:{width:"80vw"}},[a("q-card-section",{staticClass:"row items-center text-white"},[a("div",{staticClass:"text-h6"},[e._v("Pergi ke ayat")]),a("q-space"),a("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{icon:"close",flat:"",round:"",dense:""}})],1),a("q-card-section",{staticClass:"bg-white"},[a("q-input",{attrs:{rounded:"",outlined:"",placeholder:"Filter nomor ayat...",dense:"",type:"number",min:"1"},scopedSlots:e._u([{key:"prepend",fn:function(){return[a("q-icon",{attrs:{name:"search"}})]},proxy:!0}]),model:{value:e.keyword,callback:function(t){e.keyword=t},expression:"keyword"}})],1),a("q-list",{staticClass:"scroll bg-white",staticStyle:{"max-height":"60vh"},attrs:{separator:""}},[0==e.ayahListFiltered.length?a("q-item",[a("q-item-section",{staticClass:"text-center text-grey-6"},[e._v("\n          Tidak tersedia\n        ")])],1):e._e(),e._l(e.ayahListFiltered,(function(t){return a("q-item",{directives:[{name:"ripple",rawName:"v-ripple"}],key:"ayah-"+t.verseKey,attrs:{clickable:""},on:{click:function(a){return e.click(t)}}},[a("q-item-section",[e._v(" Ayat "+e._s(t.ayahNumber)+" ")])],1)}))],2)],1)],1)},N=[],_={name:"AyahChangerDialog",props:{show:{type:Boolean},surahId:{type:Number,required:!0},versesCount:{type:Number,required:!0}},data(){return{showDialog:!1,keyword:""}},watch:{show:{immediate:!0,handler(e){this.showDialog=e,this.keyword=""}},showDialog(e){this.$emit("update:show",e)}},computed:{ayahList(){return Array.from({length:this.versesCount},((e,t)=>({ayahNumber:t+1,verseKey:`${this.surahId}:${t+1}`})))},ayahListFiltered(){const e=this.keyword.toString();return e?this.ayahList.filter((t=>t.ayahNumber.toString().startsWith(e))):this.ayahList}},methods:{click(e){this.$emit("item-click",e.verseKey)}}},D=_,A=a("24e8"),Q=a("f09f"),P=a("a370"),I=a("2c91"),R=a("9c40"),$=a("27f9"),M=a("0016"),O=a("7f67"),T=a("714f"),L=Object(p["a"])(D,x,N,!1,null,null,null),j=L.exports;f()(L,"components",{QDialog:A["a"],QCard:Q["a"],QCardSection:P["a"],QSpace:I["a"],QBtn:R["a"],QInput:$["a"],QIcon:M["a"],QList:d["a"],QItem:m["a"],QItemSection:y["a"]}),f()(L,"directives",{ClosePopup:O["a"],Ripple:T["a"]});var B=function(){var e=this,t=e.$createElement,a=e._self._c||t;return e.showDialog?a("q-dialog",{model:{value:e.showDialog,callback:function(t){e.showDialog=t},expression:"showDialog"}},[a("q-card",{staticClass:"bg-primary",staticStyle:{width:"80vw"}},[a("q-card-section",{staticClass:"row items-center text-white"},[a("div",{staticClass:"text-h6"},[e._v("Ayat "+e._s(e.ayahNumber))]),a("q-space"),a("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{icon:"close",flat:"",round:"",dense:""}})],1),a("q-list",{staticClass:"bg-white",attrs:{separator:""}},[a("q-item",{directives:[{name:"ripple",rawName:"v-ripple"}],attrs:{clickable:""},on:{click:function(t){return e.play("current-only")}}},[a("q-item-section",[e._v("\n          Dengarkan ayat ini\n        ")])],1),a("q-item",{directives:[{name:"ripple",rawName:"v-ripple"}],attrs:{clickable:""},on:{click:function(t){return e.play("current-loop")}}},[a("q-item-section",[e._v("\n          Dengarkan ayat ini berulang\n        ")])],1),a("q-item",{directives:[{name:"ripple",rawName:"v-ripple"}],attrs:{clickable:""},on:{click:function(t){return e.play("current-and-continue")}}},[a("q-item-section",[e._v("\n          Dengarkan mulai dari ayat ini\n        ")])],1),a("q-item",{directives:[{name:"ripple",rawName:"v-ripple"}],attrs:{clickable:""},on:{click:function(t){return e.play("current-and-continue-loop")}}},[a("q-item-section",[e._v("\n          Dengarkan mulai dari ayat ini berulang\n        ")])],1)],1)],1)],1):e._e()},E=[],H={name:"AyahPlayOptionsDialog",props:{show:{type:Boolean,default:!1},ayahNumber:{type:[Number,String],required:!0}},data(){return{showDialog:!1}},watch:{show:{immediate:!0,handler(e){this.showDialog=e}},showDialog(e){this.$emit("update:show",e)}},methods:{play(e){this.showDialog=!1,this.$emit("item-click",e)}}},K=H,U=Object(p["a"])(K,B,E,!1,null,null,null),F=U.exports;f()(U,"components",{QDialog:A["a"],QCard:Q["a"],QCardSection:P["a"],QSpace:I["a"],QBtn:R["a"],QList:d["a"],QItem:m["a"],QItemSection:y["a"]}),f()(U,"directives",{ClosePopup:O["a"],Ripple:T["a"]});var z=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("q-page-sticky",{attrs:{position:"bottom",expand:""}},[a("transition",{attrs:{appear:"","enter-active-class":"animated fadeInUp","leave-active-class":"animated fadeOutDown"}},[e.show?a("q-card",{staticStyle:{width:"100%"},attrs:{flat:"",square:""}},[a("q-separator"),a("q-card-section",{staticClass:"row items-center no-wrap q-px-md q-py-xs",attrs:{horizontal:""}},[a("div",{staticClass:"q-ml-sm"},[a("div",{staticClass:"text-grey"},[e._v("Anda sedang mendengarkan")]),a("div",{staticClass:"text-weight-bold"},[e._v("\n            QS. "+e._s(e.surahName)+": "+e._s(e.ayahNumber)+"\n          ")])]),a("q-space"),a("q-btn",{attrs:{size:"lg",flat:"",round:"",icon:"mdi-stop-circle-outline"},on:{click:function(t){return e.stop()}}})],1)],1):e._e()],1)],1)},W=[],J={name:"AyahPlayBottomControl",props:{show:{type:Boolean},surahName:{type:String,required:!0},ayahNumber:{type:Number,required:!0}},methods:{stop(){this.$emit("stop")}}},G=J,V=a("de5e"),X=Object(p["a"])(G,z,W,!1,null,null,null),Y=X.exports;f()(X,"components",{QPageSticky:V["a"],QCard:Q["a"],QSeparator:w["a"],QCardSection:P["a"],QSpace:I["a"],QBtn:R["a"]});var Z=a("a661"),ee=a("4a10"),te=[{id:1,reciterName:"AbdulBaset AbdulSamad",style:"Mujawwad",audioUrlPrefix:"https://audio.qurancdn.com/AbdulBaset/Mujawwad/mp3/"},{id:2,reciterName:"AbdulBaset AbdulSamad",style:"Murattal",audioUrlPrefix:"https://audio.qurancdn.com/AbdulBaset/Murattal/mp3/"},{id:3,reciterName:"Abdur-Rahman as-Sudais",style:null,audioUrlPrefix:"https://audio.qurancdn.com/Sudais/mp3/"},{id:4,reciterName:"Abu Bakr al-Shatri",style:null,audioUrlPrefix:"https://audio.qurancdn.com/Shatri/mp3/"},{id:5,reciterName:"Hani ar-Rifai",style:null,audioUrlPrefix:"https://audio.qurancdn.com/Rifai/mp3/"},{id:6,reciterName:"Mahmoud Khalil Al-Husary",style:null,audioUrlPrefix:"//mirrors.quranicaudio.com/everyayah/Husary_64kbps/"},{id:12,reciterName:"Mahmoud Khalil Al-Husary",style:"Muallim",audioUrlPrefix:"//mirrors.quranicaudio.com/everyayah/Husary_Muallim_128kbps/"},{id:7,reciterName:"Mishari Rashid al-`Afasy",style:null,audioUrlPrefix:"https://audio.qurancdn.com/Alafasy/mp3/"},{id:8,reciterName:"Mohamed Siddiq al-Minshawi",style:"Mujawwad",audioUrlPrefix:"https://audio.qurancdn.com/Minshawi/Mujawwad/mp3/"},{id:9,reciterName:"Mohamed Siddiq al-Minshawi",style:"Murattal",audioUrlPrefix:"https://audio.qurancdn.com/Minshawi/Murattal/mp3/"},{id:10,reciterName:"Sa`ud ash-Shuraym",style:null,audioUrlPrefix:"https://audio.qurancdn.com/Shuraym/mp3/"},{id:11,reciterName:"Mohamed al-Tablawi",style:null,audioUrlPrefix:"//mirrors.quranicaudio.com/everyayah/Mohammad_al_Tablaway_128kbps/"}],ae={name:"QuranDetailListMode",components:{QuranReaderDetailSkeleton:k,AyahOptionsDialog:C["a"],AyahChangerDialog:j,AyahPlayOptionsDialog:F,ToTop:Z["a"],PageScrollPositionHandler:ee["a"],AyahPlayBottomControl:Y},props:{surahId:{type:Number,required:!0},offsetTop:{type:Number,default:0},verseKey:{type:String},headerHeight:{type:Number,default:0}},data(){return{init:!0,active:!1,page:"quran-reader-detail-mode",toTopShown:!1,showAyahChangerDialog:!1,showSurahChangerDialog:!1,showAyahOptionsDialog:!1,ayahOptionsDialogData:{ayahNumber:"",surahName:"",arabic:"",translation:""},showAyahPlayOptionsDialog:!1,ayahPlayOptionsDialogData:{ayahNumber:0},activeOffsetTop:0,reciterList:te,player:{type:"current-only",audio:null,audios:{},playing:!1,currentAyah:0,ayahStartFrom:0,loopCounter:0}}},watch:{surahId(){this.stopAudio(),this.player.audios={},this.getSurahDetail()},audioReciterId(){this.player.audios={}}},computed:l()(l()({},Object(c["b"])({surah:"quran/getSurah",playerSettings:"quran/getPlayerSettings"})),{},{audioReciterId(){var e,t;return null!==(e=null===(t=this.playerSettings)||void 0===t?void 0:t.audioReciterId)&&void 0!==e?e:7},ayahCount(){var e;return null===(e=this.surah)||void 0===e?void 0:e.length},scrollExtra(){const e=Object.assign({},this.surah);return delete e.ayahs,delete e.translations,{readingMode:!1,surah:e}},contentStyles(){let e=10;return this.toTopShown&&(e=64),this.player.playing&&(e=74),{minHeight:`calc(100vh - ${this.headerHeight}px)`,paddingBottom:`${e}px`}}}),methods:{getSurahDetail(){this.$store.dispatch("quran/fetchSurah",this.surahId).then((e=>{this.$nextTick((()=>{this.init=!1,window.scrollTo(0,this.offsetTop),this.verseKey&&this.scrollToElement(this.$refs[this.verseKey][0].$el)}))}))},verseNumberFromKey(e){return e.split(":")[1]},onOptionClicked(e,t){this.ayahOptionsDialogData={surahName:this.surah.nameSimple,ayahNumber:t.verse_number,arabic:e.text_uthmani,translation:t.text},this.showAyahOptionsDialog=!0},onAyahPlayClicked(e){this.isAyahPlaying(e)?this.stopAudio():(this.ayahPlayOptionsDialogData.ayahNumber=e,this.showAyahPlayOptionsDialog=!0)},prepareAyahChange(){this.showAyahChangerDialog=!0},onAyahChange(e){this.showAyahChangerDialog=!1,this.scrollToElement(this.$refs[e][0].$el)},bookmark(){this.$q.notify({type:"toast-warning",message:"Maaf fitur ini belum tersedia."})},isAyahPlaying(e){return this.player.playing&&this.player.currentAyah==e},onAyahPlay(e){this.player.type=e,this.player.loopCounter=0,this.player.currentAyah=this.ayahPlayOptionsDialogData.ayahNumber,this.player.ayahStartFrom=this.ayahPlayOptionsDialogData.ayahNumber,this.stopAudio(),this.playAudio()},getAudioUrl(e){const t=this.surahId.toString().padStart(3,"0"),a=e.toString().padStart(3,"0"),i=te.find((e=>e.id==this.audioReciterId)).audioUrlPrefix;return i+t+a+".mp3"},getAudio(e){return this.player.audios.hasOwnProperty(e)?this.player.audios[e]:new Audio(this.getAudioUrl(e))},prepareNextAudio(){let e=this.player.currentAyah+2;e>this.surah.versesCount&&(e=this.surah.versesCount);for(let t=this.player.currentAyah+1;t<=e;t++)this.player.audios.hasOwnProperty(t)||this.$set(this.player.audios,t,new Audio(this.getAudioUrl(t)))},playAudio(){this.player.audio=this.getAudio(this.player.currentAyah),this.player.audio.addEventListener("ended",this.onAudioAyahEnded),this.player.audio.play(),this.player.playing=!0,"current-and-continue"==this.player.type&&this.prepareNextAudio()},stopAudio(){this.player.audio&&(this.player.audio.pause(),this.player.audio.currentTime=0),this.player.playing=!1},onAudioAyahEnded(){if("current-loop"==this.player.type)this.player.loopCounter++,console.log("counter",this.player.loopCounter),console.log("max",this.playerSettings.singleRepeatNumber),this.player.loopCounter<this.playerSettings.singleRepeatNumber?this.playAudio():this.stopAudio();else if(this.player.type.startsWith("current-and-continue")){const e=this.player.currentAyah+1;if(e<=this.surah.versesCount){const t=this.surahId+":"+e;this.scrollToElement(this.$refs[t][0].$el),this.player.currentAyah=e,this.playAudio()}else if(this.player.type.endsWith("loop"))if(this.player.loopCounter++,this.player.loopCounter<this.playerSettings.continuedRepeatNumber){const e=this.surahId+":"+this.player.ayahStartFrom;this.scrollToElement(this.$refs[e][0].$el),this.player.currentAyah=this.player.ayahStartFrom,this.playAudio()}else this.stopAudio();else this.stopAudio()}else this.stopAudio()}},created(){this.getSurahDetail()},activated(){this.active=!0,window.scrollTo(0,this.activeOffsetTop)},deactivated(){this.active=!1}},ie=ae,se=Object(p["a"])(ie,r,n,!1,null,null,null),re=se.exports;f()(se,"components",{QList:d["a"],QItem:m["a"],QItemSection:y["a"],QItemLabel:g["a"],QBtn:R["a"]});var ne=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"quran-reading-mode bg-white"},[a("swiper",{key:e.swiperKey,ref:"quranPageSwiper",attrs:{options:e.swiperOptions,dir:"rtl"},on:{slideNextTransitionEnd:e.onNext,slidePrevTransitionEnd:e.onPrev}},e._l(e.images,(function(t){return a("swiper-slide",{key:"page-"+t.page},[a("q-img",{style:e.imageStyle,attrs:{src:t.url,contain:""}})],1)})),1)],1)},oe=[],le=(a("fb6a"),a("7212")),ce=(a("a7a3"),{name:"QuranDetailReadingMode",components:{Swiper:le["Swiper"],SwiperSlide:le["SwiperSlide"]},props:{surah:{type:Object,required:!0},pages:{type:Array,required:!0},headerHeight:{type:Number,default:0},activePage:{type:Number,default:0}},data(){return{page:"quran-reader-detail-mode",swiperKey:1,swiperOptions:{},pageCount:0,currentPage:this.pages[0],images:[]}},watch:{pages(e){this.swiperOptions.initialSlide=0,this.swiperKey=!this.swiperKey,this.currentPage=e[0],this.init()},currentPage:"saveScrollPosition"},computed:{swiper(){return this.$refs.quranPageSwiper.$swiper},imageStyle(){return{height:`calc(100vh - ${this.headerHeight}px - 10px)`,marginTop:"10px"}}},methods:{init(){this.images=[],this.pageCount=this.pages[1]-this.pages[0]+1;let e=this.currentPage+2;e=e>this.pages[1]?this.pages[1]:e;for(let t=this.pages[0];t<=e;t++)this.images.push({page:t,url:`quran-images/${t}.png`})},loadMore(){const e=this.images.slice(-1)[0].page+1;e<=this.pages[1]&&this.images.push({page:e,url:`quran-images/${e}.png`})},onNext(){this.loadMore(),this.currentPage++},onPrev(){this.currentPage--},saveScrollPosition(){this.$store.dispatch("quran/setPageScrollPosition",{page:this.page,offsetTop:0,extra:{readingMode:!0,surah:this.surah,currentPage:this.currentPage}})}},mounted(){if(0!=this.activePage){const e=this.activePage-this.pages[0];this.swiperOptions.initialSlide=e,this.currentPage=this.activePage,this.swiperKey=!this.swiperKey}this.init()},activated(){this.saveScrollPosition()}}),ue=ce,he=a("068f"),pe=Object(p["a"])(ue,ne,oe,!1,null,null,null),de=pe.exports;f()(pe,"components",{QImg:he["a"]});var me=function(){var e=this,t=e.$createElement,a=e._self._c||t;return e.showDialog?a("q-dialog",{ref:"dialog",attrs:{"no-backdrop-dismiss":""},model:{value:e.showDialog,callback:function(t){e.showDialog=t},expression:"showDialog"}},[a("q-card",{staticClass:"bg-primary",staticStyle:{width:"80vw"}},[a("q-card-section",{staticClass:"row items-center text-white"},[a("div",{staticClass:"text-h6"},[e._v("Pengaturan")]),a("q-space"),a("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{icon:"close",flat:"",round:"",dense:""}})],1),a("q-list",{staticClass:"scroll bg-white",staticStyle:{"max-height":"65vh"}},[a("q-item-label",{attrs:{header:""}},[e._v("Pengaturan pembacaan")]),a("q-item",[a("q-item-section",[a("q-item-label",{staticClass:"q-mb-sm"},[e._v("Qari")]),a("q-select",{attrs:{dense:"",outlined:"",options:e.reciterList,"option-label":function(e){return e.style?e.reciterName+" ("+e.style+")":e.reciterName},"option-value":"id","emit-value":"","map-options":""},model:{value:e.audioReciterId,callback:function(t){e.audioReciterId=t},expression:"audioReciterId"}}),a("div",{staticClass:"setting-note text-caption text-grey-7 q-mt-sm"},[e._v("\n            Apabila qari diubah saat mendengarkan bacaan, maka perubahan akan\n            dimulai pada pembacaan ayat selanjutnya.\n          ")])],1)],1),a("q-separator",{attrs:{spaced:""}}),a("q-item",[a("q-item-section",[a("q-item-label",{staticClass:"q-mb-sm"},[e._v("\n            Pengulangan satu ayat\n          ")]),a("div",{staticClass:"setting-note text-caption text-grey-7 q-mb-sm"},[e._v("\n            Pengulangan ini akan diterapkan saat memilih\n            "),a("b",[e._v("dengarkan ayat ini berulang")]),e._v(".\n          ")]),a("div",{staticClass:"row items-center justify-between"},[a("q-toggle",{class:["q-py-sm",e.singleRepeatNumberInfinite?"text-grey-10":"text-grey"],attrs:{label:"Tanpa batas",size:"xs",dense:""},model:{value:e.singleRepeatNumberInfinite,callback:function(t){e.singleRepeatNumberInfinite=t},expression:"singleRepeatNumberInfinite"}}),e.singleRepeatNumberInfinite?e._e():a("number-input-spinner",{attrs:{min:2,max:998},model:{value:e.singleRepeatNumber,callback:function(t){e.singleRepeatNumber=t},expression:"singleRepeatNumber"}})],1)],1)],1),a("q-item",[a("q-item-section",[a("q-item-label",{staticClass:"q-mb-sm"},[e._v("\n            Pengulangan ayat berlanjut\n          ")]),a("div",{staticClass:"setting-note text-caption text-grey-7 q-mb-sm"},[e._v("\n            Pengulangan ini akan diterapkan saat memilih\n            "),a("b",[e._v("dengarkan mulai ayat ini berulang")]),e._v(".\n          ")]),a("div",{staticClass:"row items-center justify-between"},[a("q-toggle",{class:["q-py-sm",e.continuedRepeatNumberInfinite?"text-grey-10":"text-grey"],attrs:{label:"Tanpa batas",size:"xs",dense:""},model:{value:e.continuedRepeatNumberInfinite,callback:function(t){e.continuedRepeatNumberInfinite=t},expression:"continuedRepeatNumberInfinite"}}),e.continuedRepeatNumberInfinite?e._e():a("number-input-spinner",{attrs:{min:2,max:998},model:{value:e.continuedRepeatNumber,callback:function(t){e.continuedRepeatNumber=t},expression:"continuedRepeatNumber"}})],1)],1)],1)],1),a("q-card-actions",{staticClass:"bg-white",attrs:{align:"right"}},[a("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{rounded:"",flat:"",color:"dark",label:"Batal"}}),a("q-btn",{attrs:{rounded:"",flat:"",color:"primary",label:"Simpan"},on:{click:function(t){return e.save()}}})],1)],1)],1):e._e()},ye=[],ge=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"number-input-spinner row no-wrap items-center justify-between",style:[e.wrapperWidth]},[a("q-btn",{attrs:{round:"",flat:"",disable:!e.allowDecrement,"text-color":e.allowDecrement?void 0:"grey-6",size:"sm",icon:"mdi-chevron-left"},on:{click:function(t){return e.decrement()}}}),a("div",{staticClass:"q-px-xs"},[e._v(e._s(e.number))]),a("q-btn",{attrs:{round:"",flat:"",disable:!e.allowIncrement,"text-color":e.allowIncrement?void 0:"grey-6",size:"sm",icon:"mdi-chevron-right"},on:{click:function(t){return e.increment()}}})],1)},be=[],we={name:"NumberInputSpinner",props:{value:{type:Number,default:0},min:{type:Number,default:void 0},max:{type:Number,default:void 0},width:{type:[Number,String]}},data(){return{number:0}},watch:{value:{immediate:!0,handler(e){this.number=e}},number(e){this.$emit("input",e)}},computed:{allowIncrement(){return!this.max||this.max&&this.number<this.max},allowDecrement(){return!this.min||this.min&&this.number>this.min},wrapperWidth(){if(!this.width)return{};const e="number"===typeof this.width?this.width+"px":this.width;return{width:e}}},methods:{increment(){this.allowIncrement&&this.number++},decrement(){this.allowDecrement&&this.number--}}},ve=we,fe=(a("4abc"),Object(p["a"])(ve,ge,be,!1,null,"ec657c9a",null)),qe=fe.exports;f()(fe,"components",{QBtn:R["a"]});var Se={name:"QuranReaderDetailSettingsDialog",components:{NumberInputSpinner:qe},props:{show:{type:Boolean,default:!1}},data(){return{showDialog:!1,reciterList:te,audioReciterId:"",singleRepeatNumber:2,singleRepeatNumberInfinite:!0,continuedRepeatNumber:2,continuedRepeatNumberInfinite:!0}},watch:{show:{immediate:!0,handler(e){this.showDialog=e,this.getStoredPlayerSettings()}},showDialog(e){this.$emit("update:show",e)},singleRepeatNumberInfinite(e){e||(this.singleRepeatNumber=2)},continuedRepeatNumberInfinite(e){e||(this.continuedRepeatNumber=2)}},methods:{getStoredPlayerSettings(){const e=this.$store.getters["quran/getPlayerSettings"];this.audioReciterId=e.audioReciterId,this.singleRepeatNumber=e.singleRepeatNumber,this.singleRepeatNumberInfinite=999==this.singleRepeatNumber,this.continuedRepeatNumber=e.continuedRepeatNumber,this.continuedRepeatNumberInfinite=999==this.continuedRepeatNumber},save(){const e={audioReciterId:this.audioReciterId,singleRepeatNumber:this.singleRepeatNumberInfinite?999:this.singleRepeatNumber,continuedRepeatNumber:this.continuedRepeatNumberInfinite?999:this.continuedRepeatNumber};this.$store.dispatch("quran/updatePlayerSettings",e),this.$refs.dialog.hide()}}},ke=Se,Ce=(a("13ec"),a("ddd8")),xe=a("9564"),Ne=a("4b7e"),_e=Object(p["a"])(ke,me,ye,!1,null,"569aaade",null),De=_e.exports;f()(_e,"components",{QDialog:A["a"],QCard:Q["a"],QCardSection:P["a"],QSpace:I["a"],QBtn:R["a"],QList:d["a"],QItemLabel:g["a"],QItem:m["a"],QItemSection:y["a"],QSelect:Ce["a"],QSeparator:w["a"],QToggle:xe["a"],QCardActions:Ne["a"]}),f()(_e,"directives",{ClosePopup:O["a"]});var Ae=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("q-dialog",{model:{value:e.showDialog,callback:function(t){e.showDialog=t},expression:"showDialog"}},[a("q-card",{staticClass:"bg-primary",staticStyle:{width:"80vw"}},[a("q-card-section",{staticClass:"row items-center text-white"},[a("div",{staticClass:"text-h6"},[e._v("Surah")]),a("q-space"),a("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{icon:"close",flat:"",round:"",dense:""}})],1),a("q-card-section",{staticClass:"bg-white"},[a("q-input",{attrs:{rounded:"",outlined:"",placeholder:"Filter surah...",dense:"",clearable:""},scopedSlots:e._u([{key:"prepend",fn:function(){return[a("q-icon",{attrs:{name:"search"}})]},proxy:!0}]),model:{value:e.keyword,callback:function(t){e.keyword=t},expression:"keyword"}})],1),a("q-list",{staticClass:"scroll bg-white",staticStyle:{"max-height":"60vh"},attrs:{separator:""}},[0==e.surahListFiltered.length?a("q-item",[a("q-item-section",{staticClass:"text-center text-grey-6"},[e._v("\n          Tidak tersedia\n        ")])],1):e._e(),e._l(e.surahListFiltered,(function(t){return a("q-item",{directives:[{name:"ripple",rawName:"v-ripple"}],key:t.id,ref:"surah-changer-"+t.id,refInFor:!0,class:["q-py-md",{"bg-blue-1":t.id==e.activeSurahId}],attrs:{clickable:""},on:{click:function(a){return e.showSurah(t.id)}}},[a("q-item-section",{staticClass:"items-center",staticStyle:{width:"40px"},attrs:{side:""}},[a("div",{staticClass:"text-center"},[e._v(e._s(t.id))])]),a("q-item-section",[a("q-item-label",[e._v(e._s(t.nameSimple))]),a("q-item-label",{attrs:{caption:""}},[e._v("\n            "+e._s(e.normalizeSurahNameTranslation(t.nameTranslated))+",\n            "+e._s(t.versesCount)+" ayat\n          ")])],1),a("q-item-section",{attrs:{side:"",top:""}},[a("q-item-label",{staticClass:"text-black text-arabic arabic-surah-name"},[e._v("\n            "+e._s(t.nameArabic)+"\n          ")])],1)],1)}))],2)],1)],1)},Qe=[],Pe=a("2cf8"),Ie={name:"SurahChangerDialog",props:{show:{type:Boolean},activeSurahId:{type:[Number,String],default:""}},data(){return{surahList:Pe["a"],showDialog:!1,keyword:""}},watch:{show:{immediate:!0,handler(e){this.showDialog=e,this.keyword="",this.$nextTick((()=>{if(e&&this.activeSurahId){const e=this.$refs["surah-changer-"+this.activeSurahId][0].$el;this.scrollToElement(e,-138,0)}}))}},showDialog(e){this.$emit("update:show",e)}},computed:{surahListFiltered(){if(this.keyword){const e=this.keyword.toLowerCase();return this.surahList.filter((t=>t.nameSimple.toLowerCase().includes(e)||t.nameArabic.toLowerCase().includes(e)||t.nameTranslated.toLowerCase().includes(e)))}return this.surahList}},methods:{showSurah(e){this.$emit("item-click",e)}}},Re=Ie,$e=Object(p["a"])(Re,Ae,Qe,!1,null,null,null),Me=$e.exports;f()($e,"components",{QDialog:A["a"],QCard:Q["a"],QCardSection:P["a"],QSpace:I["a"],QBtn:R["a"],QInput:$["a"],QIcon:M["a"],QList:d["a"],QItem:m["a"],QItemSection:y["a"],QItemLabel:g["a"]}),f()($e,"directives",{ClosePopup:O["a"],Ripple:T["a"]});var Oe={name:"QuranReaderDetail",components:{QuranReaderDetailReadingMode:de,QuranReaderDetailListMode:re,QuranReaderDetailSettingsDialog:De,SurahChangerDialog:Me},props:{offsetTop:{type:Number,default:0},verseKey:{type:String},readingModeActive:{type:Boolean,default:!1},activePage:{type:Number,default:0}},data(){return{surahList:Pe["a"],headerHeight:0,surahId:"",showSurahChangerDialog:!1,contentStyles:null,readingMode:!1,showSettingsDialog:!1,showMenuMoreDialog:!1}},meta(){return{title:this.pageTitle}},watch:{readingModeActive:{immediate:!0,handler(e){this.readingMode=e}},surahId:"trackDetail",readingMode:"trackDetail"},computed:{surah(){return this.surahList.find((e=>e.id==this.surahId))},pageTitle(){if(!this.surah)return this.productName;const e=this.readingMode?" | Reading Mode":"";return"QS. "+this.surah.nameSimple+" | "+this.surah.nameTranslated+e+" | "+this.productName},quranDetailComponent(){return this.readingMode?"quran-reader-detail-reading-mode":"quran-reader-detail-list-mode"}},methods:{trackDetail(){this.track(this.pageTitle)},onSurahChanged(e){this.$router.replace({params:{surahId:e}}).then((()=>{this.surahId=e}))},prepareAyahChange(){this.$refs.quranDetail.prepareAyahChange()},onMenuMore(){this.$refs.menuMore.setState("half")}},created(){this.surahId=parseInt(this.$route.params.surahId),this.$nextTick((()=>{this.headerHeight=this.$refs.header.$el.clientHeight,this.trackDetail()}))}},Te=Oe,Le=a("e359"),je=a("65c6"),Be=Object(p["a"])(Te,i,s,!1,null,null,null);t["default"]=Be.exports;f()(Be,"components",{QHeader:Le["a"],QToolbar:je["a"],QBtn:R["a"],QItem:m["a"],QItemSection:y["a"],QItemLabel:g["a"],QSpace:I["a"],QSeparator:w["a"],QDialog:A["a"],QCard:Q["a"],QCardSection:P["a"],QList:d["a"],QIcon:M["a"]}),f()(Be,"directives",{ClosePopup:O["a"],Ripple:T["a"]})},fb63:function(e,t,a){"use strict";var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return e.showDialog?a("q-dialog",{model:{value:e.showDialog,callback:function(t){e.showDialog=t},expression:"showDialog"}},[a("q-card",{staticClass:"bg-primary",staticStyle:{width:"80vw"}},[a("q-card-section",{staticClass:"row items-center text-white"},[a("div",{staticClass:"text-h6"},[e._v("Ayat "+e._s(e.ayahNumber))]),a("q-space"),a("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{icon:"close",flat:"",round:"",dense:""}})],1),a("q-list",{staticClass:"bg-white",attrs:{separator:""}},[a("q-item",{directives:[{name:"ripple",rawName:"v-ripple"}],attrs:{clickable:""},on:{click:function(t){return e.copy("ayah")}}},[a("q-item-section",[e._v("\n          Salin ayat\n        ")])],1),a("q-item",{directives:[{name:"ripple",rawName:"v-ripple"}],attrs:{clickable:""},on:{click:function(t){return e.copy("translation")}}},[a("q-item-section",[e._v("\n          Salin terjemahan\n        ")])],1),a("q-item",{directives:[{name:"ripple",rawName:"v-ripple"}],attrs:{clickable:""},on:{click:function(t){return e.copy("both")}}},[a("q-item-section",[e._v("\n          Salin ayat dan terjemahan\n        ")])],1),a("q-item",{directives:[{name:"ripple",rawName:"v-ripple"}],attrs:{clickable:""},on:{click:function(t){return e.bookmark()}}},[a("q-item-section",[e._v("\n          Bookmark\n        ")])],1)],1)],1)],1):e._e()},s=[],r=a("cdde"),n={name:"AyahOptionsDialog",props:{show:{type:Boolean,default:!1},surahName:{type:String,required:!0},ayahNumber:{type:[Number,String],required:!0},arabic:{type:String,required:!0},translation:{type:String,required:!0}},data(){return{showDialog:!1}},watch:{show:{immediate:!0,handler(e){this.showDialog=e}},showDialog(e){this.$emit("update:show",e)}},methods:{copy(e){let t;"ayah"==e?t=this.arabic:"translation"==e?t=this.translation:"both"==e&&(t=this.arabic+"\n\n"+this.translation),t+="\n\n",t+=`QS. ${this.surahName}: ${this.ayahNumber}`,t=this.removeFootNote(t),Object(r["a"])(t).then((()=>{this.$q.notify({type:"toast",message:"Berhasil disalin."})})).catch((()=>{this.$q.notify({type:"toast-error",message:"Gagal! Terjadi kesalahan."})}))},bookmark(){this.$q.notify({type:"toast-warning",message:"Maaf fitur ini belum tersedia."})}}},o=n,l=a("2877"),c=a("24e8"),u=a("f09f"),h=a("a370"),p=a("2c91"),d=a("9c40"),m=a("1c1c"),y=a("66e5"),g=a("4074"),b=a("7f67"),w=a("714f"),v=a("eebe"),f=a.n(v),q=Object(l["a"])(o,i,s,!1,null,null,null);t["a"]=q.exports;f()(q,"components",{QDialog:c["a"],QCard:u["a"],QCardSection:h["a"],QSpace:p["a"],QBtn:d["a"],QList:m["a"],QItem:y["a"],QItemSection:g["a"]}),f()(q,"directives",{ClosePopup:b["a"],Ripple:w["a"]})}}]);