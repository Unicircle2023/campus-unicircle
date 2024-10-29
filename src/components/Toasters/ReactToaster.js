import React from 'react'
import toast,{Toaster} from "react-hot-toast"

export const ReactToaster = ({toastMsg}) => {
        console.log("toastMsg------------",toastMsg);
           toast.success(toastMsg, {
                      duration: 4000,
                      position: 'bottom-center',
                     
                      style: {},
                      className: '',
                     
                      // icon: '👏',
                      icon: '✅',
                      
                    
                      iconTheme: {
                        primary: '#000',
                        secondary: '#fff',
                      },
                    
                      
                      ariaProps: {
                        role: 'status',
                        'aria-live': 'polite',
                      },
                    });
                  
  return (
    <div>
          
            <Toaster
                  position="bottom-center"
                  reverseOrder={false}
                  gutter={8}
                  containerClassName=""
                  containerStyle={{}}
                  
                  toastOptions={{
                    className: '',
                    duration: 5000,
                    style: {
                      color: '#36363',
                      background: '#fff',
                    },
                   
                    success: {
                      duration: 3000,
                      theme: {
                        primary: 'green',
                        secondary: 'black',
                      },
                    },
                  }}
                />
    </div>
  )
}

