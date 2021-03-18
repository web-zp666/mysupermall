<template>
  <div class="toast" v-show="isShow">
    {{message}}
  </div>
</template>

<script>
export default {
  name: 'Toast',
  props:{
   /*  message:{
      type:String,
      default:''
    },
    isShow:{
      type:Boolean,
      default:false
    } */
  },
  data(){
    return{
      isShow:false,
      message:''
    }
  },
  methods:{
    show(message,duration=1500){
      this.message = message;
      this.isShow = true;

      setTimeout(() => {
        this.message = '';
        this.isShow = false;
      },duration)
    }
  }
};
</script>

<style scoped>
.toast{
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  color: #fff;
  padding: 10px 20px;
  background-color: rgba(0,0,0,.75);
  z-index: 999;
}
</style>
