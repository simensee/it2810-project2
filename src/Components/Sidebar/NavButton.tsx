import React from 'react'

type NavButtonProps = {
  label: string,
  ref: string,
}

const NavButton = (
  { label, ref }: NavButtonProps
) => {
  return (
    <a href={ref}>
      <button>
        
      </button>
    </a>

  )
}

export default NavButton