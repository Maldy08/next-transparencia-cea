
import { getServerSession } from 'next-auth';
import Image from 'next/image'
import { authOptions } from '../api/auth/[...nextauth]/route';
import { ButtonHeader } from '.';

const sistema = process.env.NOMBRE_SISTEMA;

export const Header = async () => {
  const session = await getServerSession(authOptions);
  const user = session?.user?.name;

  return (
    <header className="relative z-30">
      <nav
        className="relative px-4 lg:px-8 py-3 shadow-elevated overflow-hidden"
        style={{
          background: 'var(--header-gradient)',
        }}
      >
        {/* Patrón decorativo de fondo */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, white 1px, transparent 1px),
                              radial-gradient(circle at 80% 50%, white 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />

        <div className="relative flex flex-wrap justify-between items-center mx-auto max-w-[1600px]">

          {/* Logo + título */}
          <div className="flex items-center gap-4">
            <Image
              src={"/assets/logo-blanco.png"}
              alt="logo CEABC"
              width={210}
              height={90}
              className="drop-shadow-md transition-transform duration-300 hover:scale-[1.02]"
            />
            {/* Separador decorativo dorado */}
            <div className="hidden lg:block w-px h-10"
              style={{ background: 'linear-gradient(180deg, transparent, rgba(189,140,82,0.5), transparent)' }}
            />
            <div className="hidden lg:flex flex-col">
              <span className="text-white/50 text-[10px] font-medium uppercase tracking-[0.2em]">
                Sistema de
              </span>
              <span className="text-white text-sm font-semibold uppercase tracking-wider leading-tight font-display">
                {sistema}
              </span>
            </div>
          </div>

          {/* Usuario */}
          <div className="lg:order-2 relative">
            <ButtonHeader user={user!} />
          </div>

        </div>

        {/* Línea dorada inferior */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px]"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(189,140,82,0.6), rgba(212,167,106,0.8), rgba(189,140,82,0.6), transparent)' }}
        />
      </nav>
    </header>
  )
}
