function SectionTitle({ title, subtitle, centered = true }) {
  return (
    <div className={`mb-12 ${centered ? 'text-center' : ''}`}>
      <h2 
        className="text-3xl md:text-4xl font-bold mb-4"
        style={{ color: 'var(--color-text)' }}
      >
        <span className="gradient-text">{title}</span>
      </h2>
      {subtitle && (
        <p 
          className="text-lg max-w-2xl mx-auto"
          style={{ color: 'var(--color-text-muted)' }}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}

export default SectionTitle
