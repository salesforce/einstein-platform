(self.webpackChunkcookbook=self.webpackChunkcookbook||[]).push([[9979],{93127:(e,t,o)=>{var r,s=Object.create,i=Object.defineProperty,l=Object.getOwnPropertyDescriptor,a=Object.getOwnPropertyNames,n=Object.getPrototypeOf,u=Object.prototype.hasOwnProperty,p=(e,t,o,r)=>{if(t&&"object"==typeof t||"function"==typeof t)for(let s of a(t))u.call(e,s)||s===o||i(e,s,{get:()=>t[s],enumerable:!(r=l(t,s))||r.enumerable});return e},h=(e,t,o)=>(((e,t,o)=>{t in e?i(e,t,{enumerable:!0,configurable:!0,writable:!0,value:o}):e[t]=o})(e,"symbol"!=typeof t?t+"":t,o),o),d={};((e,t)=>{for(var o in t)i(e,o,{get:t[o],enumerable:!0})})(d,{default:()=>f}),e.exports=(r=d,p(i({},"__esModule",{value:!0}),r));var c=((e,t,o)=>(o=null!=e?s(n(e)):{},p(!t&&e&&e.__esModule?o:i(o,"default",{value:e,enumerable:!0}),e)))(o(96540)),y=o(75635),m=o(50327);class f extends c.Component{constructor(){super(...arguments),h(this,"callPlayer",y.callPlayer),h(this,"duration",null),h(this,"currentTime",null),h(this,"fractionLoaded",null),h(this,"mute",(()=>{this.setVolume(0)})),h(this,"unmute",(()=>{null!==this.props.volume&&this.setVolume(this.props.volume)})),h(this,"ref",(e=>{this.iframe=e}))}componentDidMount(){this.props.onMount&&this.props.onMount(this)}load(e,t){(0,y.getSDK)("https://w.soundcloud.com/player/api.js","SC").then((o=>{if(!this.iframe)return;const{PLAY:r,PLAY_PROGRESS:s,PAUSE:i,FINISH:l,ERROR:a}=o.Widget.Events;t||(this.player=o.Widget(this.iframe),this.player.bind(r,this.props.onPlay),this.player.bind(i,(()=>{this.duration-this.currentTime<.05||this.props.onPause()})),this.player.bind(s,(e=>{this.currentTime=e.currentPosition/1e3,this.fractionLoaded=e.loadedProgress})),this.player.bind(l,(()=>this.props.onEnded())),this.player.bind(a,(e=>this.props.onError(e)))),this.player.load(e,{...this.props.config.options,callback:()=>{this.player.getDuration((e=>{this.duration=e/1e3,this.props.onReady()}))}})}))}play(){this.callPlayer("play")}pause(){this.callPlayer("pause")}stop(){}seekTo(e,t=!0){this.callPlayer("seekTo",1e3*e),t||this.pause()}setVolume(e){this.callPlayer("setVolume",100*e)}getDuration(){return this.duration}getCurrentTime(){return this.currentTime}getSecondsLoaded(){return this.fractionLoaded*this.duration}render(){const{display:e}=this.props,t={width:"100%",height:"100%",display:e};return c.default.createElement("iframe",{ref:this.ref,src:`https://w.soundcloud.com/player/?url=${encodeURIComponent(this.props.url)}`,style:t,frameBorder:0,allow:"autoplay"})}}h(f,"displayName","SoundCloud"),h(f,"canPlay",m.canPlay.soundcloud),h(f,"loopOnEnded",!0)}}]);