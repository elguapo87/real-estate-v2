import Image from "next/image"

const AboutPage = () => {
    return (
        <div>
            <div className="text-center text-2xl pt-10 text-gray-500">
                <p>ABOUT <span className="text-grat-700 font-medium">US</span></p>
            </div>

            <div className="my-10 flex flex-col md:flex-row gap-12">
                <Image className="w-full md:max-w-[360px]" src="/bg.png" alt="" width={500} height={500} />
                <div className="flex flex-col justify-center gap-6 md:w-2/4 text-sm md:text-base text-gray-600">
                    <p>
                        Welcome to PGEstate - where finding your perfect place is made simple, smart, and stress-free.

                        Whether you&apos;re searching for a cozy PG, a spacious flat, or the right roommate to share a city life with, we&apos;re here to make the journey smoother. Built with a passion for real estate and a focus on user experience, our platform connects tenants, property owners, and agents in one seamless space.

                        We combine powerful features like real-time chat, verified listings, and personalized recommendations to ensure you don&apos;t just browse homes - you find the right one.

                        At PGEstate, we believe your next chapter begins with a great space. Let&apos;s find it together.
                    </p>

                    <p>
                        We&apos;re on a mission to simplify the real estate journey for everyone. Whether you&apos;re moving out for the first time or searching for your next big investment, we&apos;re here to support every step with tech that works and people who care.
                    </p>
                    <b className="text-gray-800">Our Vision</b>
                    <p>
                        We know how overwhelming property hunting can be. That&apos;s why we&apos;ve built tools that actually help — from instant messaging with property owners to alerts for new listings that match your vibe. No spam. No hassle. Just real results.
                    </p>
                </div>
            </div>

            <div className="text-xl my-4">
                <p>WHY <span className="text-gray-700 font-semibold">CHOOSE US</span></p>
            </div>

            <div className="flex flex-col md:flex-row mb-20">
                <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-gray-200 hover:text-gray-800 transition-all duration-300 text-gray-600 cursor-pointer">
                    <b>Efficiency:</b>
                    <p>Streamlined appointment scheduling that fits into your busy lifestyle.</p>
                </div>
                <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-gray-200 hover:text-gray-800 transition-all duration-300 text-gray-600 cursor-pointer">
                    <b>Convenience:</b>
                    <p>Access to a network of trusted agents professionals in your area.</p>
                </div>
                <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-gray-200 hover:text-gray-800 transition-all duration-300 text-gray-600 cursor-pointer">
                    <b>Personalization:</b>
                    <p>Tailored recommendations and reminders to help you stay informed.</p>
                </div>
            </div>
        </div>
    )
}

export default AboutPage
