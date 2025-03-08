"use client"

import { AnimatePresence, motion } from "framer-motion"
import { ChevronRight, MapPin, MessageSquare, Star, X } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

const tailors = [
  {
    id: 1,
    name: "Rina Wijaya",
    location: "Jakarta Selatan",
    rating: 4.8,
    reviews: 124,
    specialty: "Clothing Repair & Alterations",
    description:
      "With over 15 years of experience, I specialize in repairing torn clothing, replacing zippers, and altering garments to fit perfectly.",
    portfolio: [
      {
        id: 1,
        image: "/placeholder.svg?height=400&width=600",
        title: "Torn Jeans Repair",
        description: "Fixed a large tear in vintage denim jeans",
      },
      {
        id: 2,
        image: "/placeholder.svg?height=400&width=600",
        title: "Dress Alteration",
        description: "Resized a formal dress for perfect fit",
      },
      {
        id: 3,
        image: "/placeholder.svg?height=400&width=600",
        title: "Jacket Zipper Replacement",
        description: "Replaced broken zipper on leather jacket",
      },
      {
        id: 4,
        image: "/placeholder.svg?height=400&width=600",
        title: "Shirt Collar Repair",
        description: "Fixed frayed collar on business shirt",
      },
      {
        id: 5,
        image: "/placeholder.svg?height=400&width=600",
        title: "Sweater Hole Repair",
        description: "Mended multiple holes in wool sweater",
      },
      {
        id: 6,
        image: "/placeholder.svg?height=400&width=600",
        title: "Pants Hemming",
        description: "Shortened pants to perfect length",
      },
    ],
    testimonials: [
      {
        id: 1,
        name: "Budi Santoso",
        rating: 5,
        comment:
          "Rina fixed my favorite jeans that had a huge tear. You can't even tell they were damaged! Fast service and reasonable price.",
        date: "2 weeks ago",
      },
      {
        id: 2,
        name: "Siti Rahma",
        rating: 5,
        comment:
          "I had several items that needed repair - a torn dress, pants with a broken zipper, and a shirt with missing buttons. Rina fixed everything perfectly!",
        date: "1 month ago",
      },
      {
        id: 3,
        name: "Dian Kusuma",
        rating: 4,
        comment:
          "Great work on my dress alterations. The fit is perfect now. Would have given 5 stars but it took a bit longer than expected.",
        date: "2 months ago",
      },
    ],
  },
  {
    id: 2,
    name: "Ahmad Faisal",
    location: "Bandung",
    rating: 4.9,
    reviews: 87,
    specialty: "Vintage Clothing Restoration",
    description:
      "I specialize in restoring vintage and delicate clothing items. My passion is bringing old garments back to life while preserving their character.",
    portfolio: [
      {
        id: 1,
        image: "/placeholder.svg?height=400&width=600",
        title: "Vintage Dress Restoration",
        description: "Restored a 1950s silk dress with multiple tears",
      },
      {
        id: 2,
        image: "/placeholder.svg?height=400&width=600",
        title: "Antique Lace Repair",
        description: "Repaired delicate lace on heirloom blouse",
      },
      {
        id: 3,
        image: "/placeholder.svg?height=400&width=600",
        title: "Suit Jacket Restoration",
        description: "Restored a damaged vintage wool suit jacket",
      },
      {
        id: 4,
        image: "/placeholder.svg?height=400&width=600",
        title: "Vintage Coat Button Replacement",
        description: "Found and replaced period-appropriate buttons",
      },
      {
        id: 5,
        image: "/placeholder.svg?height=400&width=600",
        title: "Antique Quilt Repair",
        description: "Restored family heirloom quilt with matching fabric",
      },
      {
        id: 6,
        image: "/placeholder.svg?height=400&width=600",
        title: "Vintage Handbag Restoration",
        description: "Repaired and cleaned 1960s leather handbag",
      },
    ],
    testimonials: [
      {
        id: 1,
        name: "Maya Indah",
        rating: 5,
        comment:
          "Ahmad restored my grandmother's wedding dress that had several tears and stains. His work is absolutely incredible - it looks almost new while maintaining its vintage charm.",
        date: "3 weeks ago",
      },
      {
        id: 2,
        name: "Reza Pratama",
        rating: 5,
        comment:
          "I brought in a vintage leather jacket with multiple issues - torn lining, broken zipper, and worn cuffs. Ahmad restored it beautifully. Worth every penny!",
        date: "1 month ago",
      },
    ],
  },
  {
    id: 3,
    name: "Dewi Suryani",
    location: "Yogyakarta",
    rating: 4.7,
    reviews: 156,
    specialty: "Embroidery & Detailed Repairs",
    description:
      "Specializing in detailed repair work and custom embroidery to cover or enhance repairs. I can make damaged areas look like intentional design elements.",
    portfolio: [
      {
        id: 1,
        image: "/placeholder.svg?height=400&width=600",
        title: "Embroidered Repair",
        description: "Covered a tear with custom floral embroidery",
      },
      {
        id: 2,
        image: "/placeholder.svg?height=400&width=600",
        title: "Jeans Artistic Patch",
        description: "Repaired torn jeans with decorative patch work",
      },
      {
        id: 3,
        image: "/placeholder.svg?height=400&width=600",
        title: "Sweater Repair",
        description: "Fixed multiple holes in wool sweater with matching yarn",
      },
      {
        id: 4,
        image: "/placeholder.svg?height=400&width=600",
        title: "Embellished Repair",
        description: "Added beadwork to cover damaged fabric on evening gown",
      },
      {
        id: 5,
        image: "/placeholder.svg?height=400&width=600",
        title: "Custom Monogram",
        description: "Added personalized monogram to cover stained area",
      },
      {
        id: 6,
        image: "/placeholder.svg?height=400&width=600",
        title: "Decorative Denim Repair",
        description: "Transformed torn jeans with Japanese sashiko stitching",
      },
      {
        id: 7,
        image: "/placeholder.svg?height=400&width=600",
        title: "Embroidered Collar",
        description: "Added embroidery to refresh worn shirt collar",
      },
    ],
    testimonials: [
      {
        id: 1,
        name: "Anita Wijaya",
        rating: 5,
        comment:
          "Dewi transformed my torn blouse into something even more beautiful with her embroidery work. What was once a ruined garment is now my favorite piece!",
        date: "2 weeks ago",
      },
      {
        id: 2,
        name: "Hendra Gunawan",
        rating: 4,
        comment:
          "My daughter's favorite jeans had a huge tear at the knee. Dewi added the most beautiful embroidered patch that my daughter loves even more than the original jeans.",
        date: "1 month ago",
      },
      {
        id: 3,
        name: "Lina Susanti",
        rating: 5,
        comment:
          "Dewi's attention to detail is amazing. She repaired my silk blouse that had several snags and tears. Her tiny stitches are practically invisible!",
        date: "6 weeks ago",
      },
    ],
  },
  {
    id: 4,
    name: "Budi Santoso",
    location: "Surabaya",
    rating: 4.6,
    reviews: 92,
    specialty: "Denim & Leather Repair",
    description:
      "I specialize in repairing denim and leather items. With over 10 years of experience working with these materials, I can fix tears, replace zippers, and restore worn areas.",
    portfolio: [
      {
        id: 1,
        image: "/placeholder.svg?height=400&width=600",
        title: "Leather Jacket Repair",
        description: "Repaired torn leather and replaced zipper",
      },
      {
        id: 2,
        image: "/placeholder.svg?height=400&width=600",
        title: "Denim Jeans Patch",
        description: "Reinforced worn areas with matching denim",
      },
      {
        id: 3,
        image: "/placeholder.svg?height=400&width=600",
        title: "Leather Bag Restoration",
        description: "Restored vintage leather bag with new stitching",
      },
      {
        id: 4,
        image: "/placeholder.svg?height=400&width=600",
        title: "Motorcycle Jacket Repair",
        description: "Fixed crash damage on leather motorcycle jacket",
      },
      {
        id: 5,
        image: "/placeholder.svg?height=400&width=600",
        title: "Leather Seat Repair",
        description: "Repaired torn leather on vintage chair",
      },
      {
        id: 6,
        image: "/placeholder.svg?height=400&width=600",
        title: "Denim Jacket Restoration",
        description: "Replaced worn collar and cuffs on denim jacket",
      },
    ],
    testimonials: [
      {
        id: 1,
        name: "Agus Wijaya",
        rating: 5,
        comment:
          "Budi fixed my leather jacket that had a large tear on the sleeve. The repair is invisible! Very impressed with his craftsmanship.",
        date: "1 week ago",
      },
      {
        id: 2,
        name: "Lia Kusuma",
        rating: 4,
        comment:
          "Great work on my jeans. The reinforcement patches are holding up well after multiple washes. Would recommend for denim repairs.",
        date: "3 weeks ago",
      },
    ],
  },
  {
    id: 5,
    name: "Siti Rahayu",
    location: "Semarang",
    rating: 4.9,
    reviews: 78,
    specialty: "Traditional Fabric Repair",
    description:
      "Specializing in traditional Indonesian fabrics like batik, songket, and ikat. I can repair delicate tears and restore antique textiles with traditional techniques.",
    portfolio: [
      {
        id: 1,
        image: "/placeholder.svg?height=400&width=600",
        title: "Batik Restoration",
        description: "Repaired antique batik cloth with invisible mending",
      },
      {
        id: 2,
        image: "/placeholder.svg?height=400&width=600",
        title: "Songket Repair",
        description: "Fixed loose threads and tears in ceremonial songket",
      },
      {
        id: 3,
        image: "/placeholder.svg?height=400&width=600",
        title: "Ikat Fabric Mending",
        description: "Restored color and repaired tears in ikat textile",
      },
      {
        id: 4,
        image: "/placeholder.svg?height=400&width=600",
        title: "Batik Shirt Repair",
        description: "Mended torn seam in hand-painted batik shirt",
      },
      {
        id: 5,
        image: "/placeholder.svg?height=400&width=600",
        title: "Traditional Kebaya Restoration",
        description: "Repaired and restored vintage kebaya with original techniques",
      },
      {
        id: 6,
        image: "/placeholder.svg?height=400&width=600",
        title: "Wayang Fabric Art Repair",
        description: "Restored decorative wayang fabric wall hanging",
      },
      {
        id: 7,
        image: "/placeholder.svg?height=400&width=600",
        title: "Batik Table Runner Repair",
        description: "Fixed frayed edges and tears in antique table runner",
      },
    ],
    testimonials: [
      {
        id: 1,
        name: "Endang Supriyadi",
        rating: 5,
        comment:
          "Siti restored my grandmother's batik that had several tears. Her work is meticulous and respectful of the original craftsmanship. Truly amazing!",
        date: "2 weeks ago",
      },
      {
        id: 2,
        name: "Bambang Sutrisno",
        rating: 5,
        comment:
          "I brought in a family heirloom songket that was damaged. Siti repaired it beautifully, and you can't even tell where the tears were. Highly recommended!",
        date: "1 month ago",
      },
    ],
  },
  {
    id: 6,
    name: "Hendra Wijaya",
    location: "Medan",
    rating: 4.7,
    reviews: 113,
    specialty: "Formal & Wedding Attire Repair",
    description:
      "I specialize in repairing and altering formal wear and wedding attire. From fixing delicate lace to repairing beadwork, I ensure your special occasion clothing looks perfect.",
    portfolio: [
      {
        id: 1,
        image: "/placeholder.svg?height=400&width=600",
        title: "Wedding Dress Repair",
        description: "Fixed torn lace and replaced missing beads",
      },
      {
        id: 2,
        image: "/placeholder.svg?height=400&width=600",
        title: "Tuxedo Restoration",
        description: "Repaired vintage tuxedo with new lining and buttons",
      },
      {
        id: 3,
        image: "/placeholder.svg?height=400&width=600",
        title: "Evening Gown Repair",
        description: "Fixed sequin work and tear in silk evening gown",
      },
      {
        id: 4,
        image: "/placeholder.svg?height=400&width=600",
        title: "Veil Restoration",
        description: "Repaired delicate wedding veil with invisible mending",
      },
      {
        id: 5,
        image: "/placeholder.svg?height=400&width=600",
        title: "Beadwork Repair",
        description: "Restored intricate beading on formal gown",
      },
      {
        id: 6,
        image: "/placeholder.svg?height=400&width=600",
        title: "Suit Alteration",
        description: "Resized vintage suit for modern fit",
      },
    ],
    testimonials: [
      {
        id: 1,
        name: "Maya Indah",
        rating: 5,
        comment:
          "Hendra saved my wedding day! My dress had a tear just days before the ceremony, and he fixed it perfectly. You couldn't even tell it was damaged!",
        date: "3 weeks ago",
      },
      {
        id: 2,
        name: "Rudi Hartono",
        rating: 4,
        comment:
          "Great work on my suit repair. The stitching is impeccable and the new buttons match perfectly. Will definitely use his services again.",
        date: "1 month ago",
      },
      {
        id: 3,
        name: "Anita Sari",
        rating: 5,
        comment:
          "Hendra repaired my mother's 30-year-old wedding dress that I wanted to wear for my own wedding. His attention to detail is amazing. The dress looks brand new!",
        date: "2 months ago",
      },
    ],
  },
  {
    id: 7,
    name: "Putri Anggraini",
    location: "Bali",
    rating: 4.8,
    reviews: 105,
    specialty: "Resort Wear & Swimwear Repair",
    description:
      "Specializing in repairing resort wear, swimwear, and lightweight summer clothing. I can fix tears, replace elastic, and restore damaged beachwear to like-new condition.",
    portfolio: [
      {
        id: 1,
        image: "/placeholder.svg?height=400&width=600",
        title: "Swimsuit Elastic Replacement",
        description: "Replaced worn elastic in designer swimsuit",
      },
      {
        id: 2,
        image: "/placeholder.svg?height=400&width=600",
        title: "Beach Cover-up Repair",
        description: "Fixed torn lace on beach cover-up",
      },
      {
        id: 3,
        image: "/placeholder.svg?height=400&width=600",
        title: "Resort Dress Alteration",
        description: "Resized and repaired vacation dress",
      },
      {
        id: 4,
        image: "/placeholder.svg?height=400&width=600",
        title: "Swimwear Strap Repair",
        description: "Replaced broken straps on bikini top",
      },
      {
        id: 5,
        image: "/placeholder.svg?height=400&width=600",
        title: "Linen Shirt Repair",
        description: "Fixed torn seam and replaced buttons on linen shirt",
      },
      {
        id: 6,
        image: "/placeholder.svg?height=400&width=600",
        title: "Sarong Restoration",
        description: "Repaired frayed edges on hand-painted sarong",
      },
    ],
    testimonials: [
      {
        id: 1,
        name: "Diana Putri",
        rating: 5,
        comment:
          "Putri saved my favorite swimsuit! The elastic was completely worn out, and she replaced it perfectly. Fits like new again!",
        date: "2 weeks ago",
      },
      {
        id: 2,
        name: "James Wilson",
        rating: 5,
        comment:
          "I ripped my favorite linen shirt while on vacation in Bali. Putri fixed it so well you can't even tell it was damaged. Quick service too!",
        date: "1 month ago",
      },
      {
        id: 3,
        name: "Sarah Johnson",
        rating: 4,
        comment: "Great work on my beach cover-up. The lace repair is beautiful and the price was reasonable.",
        date: "6 weeks ago",
      },
    ],
  },
  {
    id: 8,
    name: "Rudi Hartono",
    location: "Makassar",
    rating: 4.5,
    reviews: 67,
    specialty: "Uniform & Workwear Repair",
    description:
      "I specialize in repairing and altering uniforms and workwear. From fixing tears and replacing zippers to adding reinforcement for heavy-duty use, I ensure your work clothes last longer.",
    portfolio: [
      {
        id: 1,
        image: "/placeholder.svg?height=400&width=600",
        title: "Chef Jacket Repair",
        description: "Reinforced seams and replaced buttons on chef uniform",
      },
      {
        id: 2,
        image: "/placeholder.svg?height=400&width=600",
        title: "Work Pants Reinforcement",
        description: "Added knee reinforcement to prevent future tears",
      },
      {
        id: 3,
        image: "/placeholder.svg?height=400&width=600",
        title: "Security Uniform Alteration",
        description: "Resized and repaired security guard uniform",
      },
      {
        id: 4,
        image: "/placeholder.svg?height=400&width=600",
        title: "Nurse Uniform Repair",
        description: "Fixed torn pocket and replaced zipper on scrubs",
      },
      {
        id: 5,
        image: "/placeholder.svg?height=400&width=600",
        title: "Mechanic Coverall Repair",
        description: "Patched and reinforced mechanic's coveralls",
      },
    ],
    testimonials: [
      {
        id: 1,
        name: "Anton Wijaya",
        rating: 5,
        comment:
          "Rudi repaired my chef jackets and added reinforcement to prevent future tears. His work is excellent and has saved me money on replacements.",
        date: "3 weeks ago",
      },
      {
        id: 2,
        name: "Nina Hartati",
        rating: 4,
        comment:
          "Good work on my nurse uniforms. The repairs are holding up well after multiple washes. Reasonable prices too.",
        date: "1 month ago",
      },
    ],
  },
  {
    id: 9,
    name: "Maya Kusuma",
    location: "Palembang",
    rating: 4.9,
    reviews: 94,
    specialty: "Children's Clothing Repair",
    description:
      "Specializing in repairing children's clothing with a focus on durability and comfort. I can fix tears, replace zippers, and add reinforcement to make kids' clothes last longer.",
    portfolio: [
      {
        id: 1,
        image: "/placeholder.svg?height=400&width=600",
        title: "School Uniform Repair",
        description: "Fixed torn pocket and reinforced knees on school pants",
      },
      {
        id: 2,
        image: "/placeholder.svg?height=400&width=600",
        title: "Children's Jacket Zipper",
        description: "Replaced broken zipper on child's winter jacket",
      },
      {
        id: 3,
        image: "/placeholder.svg?height=400&width=600",
        title: "Growth Extension",
        description: "Added fabric to extend life of growing child's pants",
      },
      {
        id: 4,
        image: "/placeholder.svg?height=400&width=600",
        title: "Costume Repair",
        description: "Fixed torn seams on child's dance costume",
      },
      {
        id: 5,
        image: "/placeholder.svg?height=400&width=600",
        title: "Reinforced Knees",
        description: "Added decorative patches to reinforce pants knees",
      },
      {
        id: 6,
        image: "/placeholder.svg?height=400&width=600",
        title: "Sports Uniform Repair",
        description: "Fixed torn soccer uniform with reinforced stitching",
      },
      {
        id: 7,
        image: "/placeholder.svg?height=400&width=600",
        title: "Backpack Repair",
        description: "Reinforced straps and fixed tear in school backpack",
      },
    ],
    testimonials: [
      {
        id: 1,
        name: "Ratna Sari",
        rating: 5,
        comment:
          "Maya is amazing! She's fixed countless items of my kids' clothing and they always come back stronger than before. Her reinforced knees on pants have saved us so much money.",
        date: "2 weeks ago",
      },
      {
        id: 2,
        name: "Budi Prakoso",
        rating: 5,
        comment:
          "My son's school uniforms were constantly getting torn. Maya not only repaired them but added reinforcement that has prevented new tears. Highly recommended!",
        date: "1 month ago",
      },
      {
        id: 3,
        name: "Lina Wati",
        rating: 5,
        comment:
          "Maya fixed my daughter's favorite dress that had a huge tear. She did such a beautiful job that my daughter didn't even notice it had been repaired!",
        date: "6 weeks ago",
      },
    ],
  },
]

export function TailorPortfolio() {
  const [selectedTailor, setSelectedTailor] = useState(null)
  const [selectedImage, setSelectedImage] = useState(null)

  const openPortfolio = (tailor) => {
    setSelectedTailor(tailor)
  }

  const closePortfolio = () => {
    setSelectedTailor(null)
  }

  const openImageView = (image) => {
    setSelectedImage(image)
  }

  const closeImageView = () => {
    setSelectedImage(null)
  }

  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {tailors.map((tailor) => (
          <motion.div
            key={tailor.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -5 }}
          >
            <div className="relative h-48 bg-gray-100">
              <Image
                src={tailor.portfolio[0].image || "/placeholder.svg"}
                alt={tailor.name}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-4 text-white">
                <h3 className="text-xl font-semibold">{tailor.name}</h3>
                <div className="flex items-center mt-1 text-sm">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{tailor.location}</span>
                </div>
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-center mb-3">
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  <span className="ml-1 font-medium">{tailor.rating}</span>
                </div>
                <span className="mx-2 text-gray-400">•</span>
                <span className="text-gray-600 text-sm">{tailor.reviews} reviews</span>
              </div>
              <p className="text-sm font-medium text-[#1D9BF0] mb-2">{tailor.specialty}</p>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{tailor.description}</p>
              <div className="flex -mx-1 mb-4 overflow-x-auto pb-2 scrollbar-hide">
                {tailor.portfolio.slice(0, 4).map((item) => (
                  <div key={item.id} className="px-1 flex-shrink-0 w-20">
                    <div className="h-20 w-20 rounded-md overflow-hidden bg-gray-100">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        width={80}
                        height={80}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={() => openPortfolio(tailor)}
                className="w-full py-2 px-4 bg-[#1D9BF0] text-white rounded-md hover:bg-[#0c85d0] transition-colors flex items-center justify-center"
              >
                View Portfolio
                <ChevronRight className="h-4 w-4 ml-1" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedTailor && (
          <motion.div
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closePortfolio}
          >
            <motion.div
              className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 z-10 bg-white border-b border-gray-100 flex items-center justify-between p-4">
                <div>
                  <h3 className="text-xl font-semibold">{selectedTailor.name}</h3>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{selectedTailor.location}</span>
                    <span className="mx-2">•</span>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                      <span className="ml-1">{selectedTailor.rating}</span>
                      <span className="ml-1">({selectedTailor.reviews} reviews)</span>
                    </div>
                  </div>
                </div>
                <button onClick={closePortfolio} className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="p-4">
                <div className="mb-6">
                  <h4 className="text-lg font-medium mb-2">About</h4>
                  <p className="text-gray-600">{selectedTailor.description}</p>
                  <button
                    onClick={() => (window.location.href = `/chat/`)}
                    className="mt-4 py-2 px-4 bg-[#1D9BF0] text-white rounded-md hover:bg-[#0c85d0] transition-colors flex items-center justify-center"
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Chat with {selectedTailor.name}
                  </button>
                </div>

                <div className="mb-6">
                  <h4 className="text-lg font-medium mb-3">Portfolio</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {selectedTailor.portfolio.map((item) => (
                      <motion.div
                        key={item.id}
                        className="relative rounded-lg overflow-hidden cursor-pointer group"
                        whileHover={{ scale: 1.03 }}
                        transition={{ duration: 0.2 }}
                        onClick={() => openImageView(item)}
                      >
                        <div className="aspect-square bg-gray-100">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.title}
                            width={300}
                            height={300}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
                          <h5 className="text-white font-medium text-sm">{item.title}</h5>
                          <p className="text-white/80 text-xs">{item.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-medium mb-3">Customer Testimonials</h4>
                  <div className="space-y-4">
                    {selectedTailor.testimonials.map((testimonial) => (
                      <motion.div
                        key={testimonial.id}
                        className="bg-gray-50 rounded-lg p-4"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h5 className="font-medium">{testimonial.name}</h5>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                                  }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm mb-1">{testimonial.comment}</p>
                        <p className="text-gray-400 text-xs">{testimonial.date}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeImageView}
          >
            <motion.div
              className="relative max-w-4xl w-full"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeImageView}
                className="absolute top-2 right-2 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
              <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                <Image
                  src={selectedImage.image || "/placeholder.svg"}
                  alt={selectedImage.title}
                  width={1200}
                  height={800}
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="mt-4 text-white">
                <h3 className="text-xl font-medium">{selectedImage.title}</h3>
                <p className="text-white/80">{selectedImage.description}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

