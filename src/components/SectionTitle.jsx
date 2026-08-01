import useTheme from '../hooks/useTheme'

function SectionTitle({ title, subtitle }) {
  const { theme } = useTheme()

  return (
    <div className="text-center mb-12">
      <h2 className={`text-3xl md:text-4xl font-bold mb-3 ${
        theme === 'dark' ? 'text-white' : 'text-slate-900'
      }`}>
        {title}
      </h2>
      {/* Gradient accent line */}
      <div className="w-16 h-1 mx-auto mb-4 rounded-full" style={{ background: 'linear-gradient(90deg, #6366f1, #22d3ee)' }} />
      {subtitle && (
        <p className={`text-lg max-w-2xl mx-auto ${
          theme === 'dark' ? 'text-zinc-400' : 'text-slate-600'
        }`}>
          {subtitle}
        </p>
      )}
    </div>
  )
}

export default SectionTitle
