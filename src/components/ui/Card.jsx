function Card({ children, className = '', hover = true, ...props }) {
  return (
    <div 
      className={`card ${hover ? '' : 'hover:transform-none hover:shadow-none'} ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

export default Card
