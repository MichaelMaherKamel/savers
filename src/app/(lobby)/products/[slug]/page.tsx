// 'use client'

// import React, { useEffect, useState } from 'react'
// import { ArrowLeft, Check } from 'lucide-react'
// import { Button } from '@/components/ui/button'
// import Image from 'next/image'
// import Link from 'next/link'

// // Using the same mock data from the products page
// const productData = [
//   // Safes
//   {
//     id: 'executive-vault-safe',
//     title: 'Executive Vault Safe',
//     description:
//       'Heavy-duty fireproof safe with biometric lock for top executives. Fire-resistant for up to 2 hours with biometric fingerprint scanner and digital keypad with backup key.',
//     image: '/pics/Safe1.jpg',
//     category: 'Safes',
//     features: ['Fire-resistant for up to 2 hours', 'Biometric fingerprint scanner', 'Digital keypad with backup key'],
//   },
//   {
//     id: 'office-documents-safe',
//     title: 'Office Documents Safe',
//     description:
//       'Medium-sized safe for important company documents and small valuables. Water-resistant construction with programmable electronic lock and interior LED lighting.',
//     image: '/pics/Safe2.jpg',
//     category: 'Safes',
//     features: ['Water-resistant construction', 'Programmable electronic lock', 'Interior LED lighting'],
//   },
//   {
//     id: 'compact-drawer-safe',
//     title: 'Compact Drawer Safe',
//     description:
//       'Discreet safe designed to fit in standard desk drawers with steel construction, key lock system and mounting hardware included.',
//     image: '/safe-compact.jpg',
//     category: 'Safes',
//     features: ['Steel construction', 'Key lock system', 'Mounting hardware included'],
//   },

//   // Lockers
//   {
//     id: 'employee-locker-system',
//     title: 'Employee Locker System',
//     description:
//       'Modular locker system for employee personal belongings and equipment. Customizable configurations with digital or key lock options and ventilated design.',
//     image: '/pics/Lock1.webp',
//     category: 'Lockers',
//     features: ['Customizable configurations', 'Digital or key lock options', 'Ventilated design'],
//   },
//   {
//     id: 'mail-distribution-lockers',
//     title: 'Mail Distribution Lockers',
//     description:
//       'Secure compartments for internal mail and package delivery with multiple size compartments, master key access and durable powder-coated finish.',
//     image: '/pics/Lock2.JPG',
//     category: 'Lockers',
//     features: ['Multiple size compartments', 'Master key access', 'Durable powder-coated finish'],
//   },
//   {
//     id: 'tech-storage-lockers',
//     title: 'Tech Storage Lockers',
//     description:
//       'Specialized lockers with charging capabilities for electronic devices. Built-in charging ports with RFID lock system and asset tracking integration.',
//     image: '/locker-tech.jpg',
//     category: 'Lockers',
//     features: ['Built-in charging ports', 'RFID lock system', 'Asset tracking integration'],
//   },

//   // Printers
//   {
//     id: 'enterprise-multifunction-printer',
//     title: 'Enterprise Multifunction Printer',
//     description:
//       'High-volume multifunction printer for busy office environments. Print, scan, copy, fax with wireless connectivity and advanced security features.',
//     image: '/pics/CanonPrinter1.jpg',
//     category: 'Printers',
//     features: ['Print, scan, copy, fax', 'Wireless connectivity', 'Advanced security features'],
//   },
//   {
//     id: 'departmental-laser-printer',
//     title: 'Departmental Laser Printer',
//     description:
//       'Reliable color laser printer for departmental use. Duplex printing, network-ready with high-capacity toner options for efficient office printing.',
//     image: '/pics/CanonPrinter2.jpg',
//     category: 'Printers',
//     features: ['Duplex printing', 'Network-ready', 'High-capacity toner options'],
//   },
//   {
//     id: 'secure-document-printer',
//     title: 'Secure Document Printer',
//     description:
//       'Specialized printer with enhanced security features for sensitive documents. PIN-protected printing with encryption capabilities and audit trail logging.',
//     image: '/printer-secure.jpg',
//     category: 'Printers',
//     features: ['PIN-protected printing', 'Encryption capabilities', 'Audit trail logging'],
//   },
// ]

// const ProductPage = ({ params }: { params: { id: string } }) => {
//   const { id } = params
//   const [product, setProduct] = useState<any>(null)
//   const [relatedProducts, setRelatedProducts] = useState<any[]>([])

//   useEffect(() => {
//     // Find the product based on the URL id parameter
//     const foundProduct = productData.find((p) => p.id === id)
//     setProduct(foundProduct)

//     // Find related products from the same category
//     if (foundProduct) {
//       const related = productData.filter((p) => p.category === foundProduct.category && p.id !== id).slice(0, 3)
//       setRelatedProducts(related)
//     }
//   }, [id])

//   if (!product) {
//     return (
//       <div className='container mx-auto px-4 py-20 flex items-center justify-center'>
//         <div className='text-center'>
//           <h2 className='text-2xl font-bold'>Product not found</h2>
//           <p className='mt-4 text-gray-600'>The product you're looking for doesn't exist or has been removed.</p>
//           <Link href='/products'>
//             <Button className='mt-8 bg-red-700 hover:bg-red-800'>
//               <ArrowLeft className='mr-2 h-4 w-4' />
//               Back to Products
//             </Button>
//           </Link>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className='container mx-auto px-4 py-16 sm:px-6 lg:px-8 pt-24'>
//       <div className='mb-6'>
//         <Link href='/products' className='inline-flex items-center text-red-700 hover:text-red-800'>
//           <ArrowLeft className='mr-2 h-4 w-4' />
//           Back to Products
//         </Link>
//       </div>

//       <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16'>
//         {/* Product Image */}
//         <div className='relative aspect-square w-full bg-gray-100 rounded-lg overflow-hidden'>
//           {product.image ? (
//             <Image src={product.image} alt={product.title} fill className='object-cover' priority />
//           ) : (
//             <div className='flex h-full items-center justify-center bg-gray-200'>
//               <span className='text-gray-500'>No image available</span>
//             </div>
//           )}
//           <div className='absolute top-4 right-4'>
//             <span className='inline-flex items-center rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-800'>
//               {product.category}
//             </span>
//           </div>
//         </div>

//         {/* Product Details */}
//         <div>
//           <h1 className='text-3xl font-bold text-gray-900 mb-4'>{product.title}</h1>
//           <p className='text-lg text-gray-600 mb-8'>{product.description}</p>

//           <div className='mb-8'>
//             <h2 className='text-xl font-semibold mb-4'>Key Features</h2>
//             <ul className='space-y-2'>
//               {product.features.map((feature: string, index: number) => (
//                 <li key={index} className='flex items-start'>
//                   <Check className='h-5 w-5 text-red-700 mr-2 mt-0.5' />
//                   <span>{feature}</span>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           <div className='mt-8'>
//             <Link href='/contact'>
//               <Button className='w-full bg-red-700 hover:bg-red-800 py-6 text-lg'>Contact Us About This Product</Button>
//             </Link>
//           </div>
//         </div>
//       </div>

//       {/* Related Products */}
//       {relatedProducts.length > 0 && (
//         <div className='mt-16'>
//           <h2 className='text-2xl font-bold mb-8'>Related Products</h2>
//           <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
//             {relatedProducts.map((relatedProduct) => (
//               <ProductCard
//                 key={relatedProduct.id}
//                 id={relatedProduct.id}
//                 title={relatedProduct.title}
//                 description={relatedProduct.description}
//                 image={relatedProduct.image}
//                 category={relatedProduct.category}
//               />
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

// export default ProductPage

import React from 'react'

const ProductPage = () => {
  return <div>ProductPage</div>
}

export default ProductPage
