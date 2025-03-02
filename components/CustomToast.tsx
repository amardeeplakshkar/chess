/* eslint-disable @typescript-eslint/no-unused-vars */
import { toast } from "react-hot-toast";
const CustomToast = ({ text }: { text: string }) => {
    const showToast = () => {
      toast(text, {
        icon: '👏',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
    };
  
    return null;
  };
  
  export default CustomToast;