import { getServerSession } from "next-auth";
import { Footer, Header } from "../components";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";


export default async function TransparenciaLayout({
    children
}: {
    children: React.ReactNode;
}) {

    
  const session = await getServerSession(authOptions);
  if( !session ) {
    redirect('/api/auth/signin')
  }
    return (
        <div className="flex h-screen bg-gradient-to-br from-gray-50 via-gray-100/80 to-gray-50 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950">
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header />
                <div className="flex h-full">
                    <main className="flex grow overflow-x-hidden overflow-y-auto mb-14">
                        <div className="w-full px-4 py-6 sm:px-6 sm:py-8 lg:px-10 max-w-[1600px] mx-auto animate-slide-up">
                            { children }
                        </div>
                    </main>
                </div>
            </div>
            <Footer />
        </div>

    );
}