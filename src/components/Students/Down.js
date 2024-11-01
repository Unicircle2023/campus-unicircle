import React from 'react'
import cx from "classnames";
export function Down() {
    const Down = ({ isOpen }) => {
    return (
        <div>
             <svg
      className={cx("icon-down", { "is-open": isOpen })}
      width="16"
      height="16"
      viewBox="0 0 16 16"
    >
      <path d="M14.8 4L8 9.6 1.2 4 0 5.333 8 12l8-6.667z" />
    </svg>   
        </div>
    )
    }
}
Down.defaultProps = {};