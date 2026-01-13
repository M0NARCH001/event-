import Image from "next/image"

interface ArtistCardProps {
    name: string
    role: string
    image: string
}

export function ArtistCard({ name, role, image }: ArtistCardProps) {
    return (
        <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-100 flex flex-col">
            <div className="relative aspect-[3/4] w-full mb-3 rounded-lg overflow-hidden">
                <Image src={image || "/placeholder.svg"} alt={name} fill className="object-cover" />
            </div>
            <div>
                <h4 className="font-medium text-slate-900 leading-tight font-albert">{name}</h4>
                <p className="text-slate-500 text-sm font-poppins">{role}</p>
            </div>
        </div>
    )
}
