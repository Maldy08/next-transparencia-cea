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
        <div className="flex h-screen">
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header />
                <div className="flex h-full">
                    <main className="flex grow overflow-x-hidden overflow-y-auto mb-14">
                        <div className="w-full px-6 py-8 lg:px-10">
                            { children }
                        </div>
                    </main>
                </div>
            </div>
            <Footer />
        </div>

    );
}