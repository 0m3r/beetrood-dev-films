import React, { useEffect , useState} from "react"
import Message from "./Message"
import PropTypes from "prop-types"

const FlashMessage = ({children, type, color, timeout}) => {

  const [show, setShow] = useState(false);

  useEffect(() => {
    if (children.length) {
      setShow(true);
      const timer = setTimeout(() => {
        setShow(false);
      }, timeout);
      return () => clearTimeout(timer);
    }
  }, [children]);

  return (show ? <Message type={type} color={color}>{children}</Message> : '')
}

FlashMessage.propTypes = {
  type: PropTypes.string,
  color: PropTypes.string,
  children: PropTypes.string.isRequired,
  timeout: PropTypes.number,
}

FlashMessage.defaultProps = {
  type: "bell",
  color: "olive",
  timeout: 3000,
}

export default FlashMessage
