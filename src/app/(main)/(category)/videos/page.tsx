import BreadcrumbComponent from '@/components/BreadcrumbConponent'
import Heading from '@/components/main/Heading'
import Videos from '@/components/main/Videos'

const VideosPage = () => {
    return (
        <div className="min-h-screen">
            <div className="min-h-screen">
                <div className="container py-2 px-4 md:px-6 mt-3">
                    <BreadcrumbComponent
                        links={[
                            { label: "Home", href: "/" },
                            {
                                label: "Video",
                            },
                        ]}
                    />
                </div>

                <Heading title="Videos" />

                <Videos />
            </div>
        </div>
    )
}

export default VideosPage