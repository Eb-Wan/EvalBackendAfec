import ReCAPTCHA from "react-google-recaptcha";
import { useEffect, useState } from "react";
import Spinner from "./Spinner";

const Captcha = ({ recaptcha }) => {
    const [isRecaptchaAllowed, setIsRecaptchaAllowed] = useState(null);

    useEffect(() => {
    let retries = 0;
    const maxRetries = 10; // Stop after 10 seconds (10 * 500ms)
  
    const checkConsent = () => {
      if (window.tarteaucitron?.state?.recaptcha !== undefined) {
        setIsRecaptchaAllowed(window.tarteaucitron?.state?.recaptcha);
      } else if (retries < maxRetries) {
        retries += 1; // Retry until maxRetries
        setTimeout(checkConsent, 500);
      } else {
        setIsRecaptchaAllowed(false);
      }
    };
      checkConsent();
    }, []);
  

  return (
    <>
      {isRecaptchaAllowed === null ? <Spinner /> : (isRecaptchaAllowed ? <ReCAPTCHA className="mx-auto my-4" ref = { recaptcha } sitekey = { import.meta.env.VITE_CAPTCHA_SITE } /> : <p className="p-3 m-4 text-danger-emphasis bg-danger-subtle border border-danger-subtle rounded-3">Les cookies captcha sont désactivé, veuillez les activer pour continuer.</p>)}
    </>
  )
}

export default Captcha