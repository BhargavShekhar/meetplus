import { Meet } from "@/components/meet/ui/Meet";

interface Props {
    params: {
        identity: string
    }
}

export default async function page({ params }: Props) {
    const { identity } = await params;
    return <Meet identity={identity} />
}