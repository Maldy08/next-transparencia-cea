
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
        className="px-4 lg:px-8 py-3 shadow-lg border-b-4 border-secondary-500"
        style={{
          background: 'linear-gradient(90deg, #4b0c1f 0%, #651930 40%, #7a1e39 100%)',
        }}
      >
        <div className="flex flex-wrap justify-between items-center mx-auto">

          {/* Logo */}
          <div className="flex items-center gap-4">
            <Image
              src={"/assets/logo-blanco.png"}
              alt="logo CEABC"
              width={210}
              height={90}
              className="drop-shadow-md"
            />
            {/* Separador decorativo */}
            <div className="hidden lg:block w-px h-10 bg-white/20" />
            <div className="hidden lg:flex flex-col">
              <span className="text-white/60 text-[10px] font-medium uppercase tracking-widest">
                Sistema de
              </span>
              <span className="text-white text-sm font-semibold uppercase tracking-wide leading-tight">
                {sistema}
              </span>
            </div>
          </div>

          {/* Usuario */}
          <div className="lg:order-2 relative">
            <ButtonHeader user={user!} />
          </div>

        </div>
      </nav>
    </header>
  )
}
