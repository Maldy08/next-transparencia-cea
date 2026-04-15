
const sistema = process.env.NOMBRE_SISTEMA?.toUpperCase();

export const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 z-20 w-full p-3 border-t-2 border-secondary-600 shadow-lg flex items-center justify-center"
      style={{ background: 'linear-gradient(90deg, #4b0c1f 0%, #651930 100%)' }}
    >
      <span className="text-[11px] text-white/80 text-center tracking-wide">
        COMISIÓN ESTATAL DEL AGUA DE BAJA CALIFORNIA &nbsp;·&nbsp; 2024 &copy; {sistema}
      </span>
    </footer>
  )
}
