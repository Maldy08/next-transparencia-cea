
const sistema = process.env.NOMBRE_SISTEMA?.toUpperCase();

export const Footer = () => {
  return (
    <footer
      className="fixed bottom-0 left-0 z-20 w-full shadow-lg"
    >
      {/* Línea dorada superior */}
      <div className="h-[2px]"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(189,140,82,0.5), rgba(212,167,106,0.7), rgba(189,140,82,0.5), transparent)' }}
      />

      <div
        className="flex items-center justify-center px-4 py-3 backdrop-blur-md"
        style={{
          background: 'linear-gradient(90deg, rgba(75,12,31,0.95) 0%, rgba(101,25,48,0.95) 50%, rgba(75,12,31,0.95) 100%)',
        }}
      >
        <span className="text-[11px] text-white/70 text-center tracking-wider font-light">
          COMISIÓN ESTATAL DEL AGUA DE BAJA CALIFORNIA &nbsp;·&nbsp; 2024 &copy; {sistema}
        </span>
      </div>
    </footer>
  )
}
