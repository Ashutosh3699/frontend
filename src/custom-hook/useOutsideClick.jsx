import { useEffect } from 'react';

function useOutsideClick(ref, callback) {
  useEffect(() => {

    const handleClick = event => {
        // console.log("ref is ", ref);
      if (ref.current && !ref.current.contains(event.target)){
        callback();
      }
    };

    document.addEventListener('click', handleClick);

  }, [ref, callback]);
}

export default useOutsideClick; 