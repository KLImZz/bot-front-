const tg = window.Telegram.WebApp; 

export function useTelegram(){
    const closeEvent =()=>{
        tg.close()
      } 
      const onToggleButton =()=>{
        if (tg.MainButton.isVisible){
            tg.MainButton.hide() 
        } else{
            tg.MainButton.show() 
        }
      }
      return{
        closeEvent , 
        
        onToggleButton, 
        tg, 
        user:tg.initDataUnsafe?.user
      }
}