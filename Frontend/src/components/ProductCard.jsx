import React,{useState} from 'react'
import { Box, Heading, HStack, IconButton, Image, useColorModeValue, Text, useToast
, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, VStack, 
Input, Button, ModalFooter
 } from '@chakra-ui/react'
import { useProductStore } from '@/store/product'
import { EditIcon, DeleteIcon } from '@chakra-ui/icons'

const ProductCard = ({product}) => {
    const [UpdateProduct, setUpdateProduct] = useState(product);
    const textColor = useColorModeValue('gray.600', 'gray.200');
    const bg = useColorModeValue('white', 'gray.800');
    const { deleteProduct, updateProduct } = useProductStore();
    const toast = useToast();
    const {isOpen, onOpen, onClose} = useDisclosure();
    const handleDeleteProduct = async (pid) => {
        const { success,message } = await deleteProduct(pid);
        if (!success) {
            toast({
                title: 'Error Deleting Product',
                description: message,
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        } else {
            toast({
                title: 'Product Deleted',
                description: message,
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
        }
    };
    const handleUpdateProduct = async (pid, updatedProduct) => {
        const {success,message} = await updateProduct(pid, updatedProduct);
        onClose();
        if (!success) {
            toast({
                title: 'Error Updating Product',
                description: message,
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        } else {
            toast({
                title: 'Product Updated',
                description: "Product Updated Successfully",
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
        }
    };

    return (
        <Box
            shadow="lg"
            rounded="lg"
            overflow="hidden"
            transition="all 0.3s"
            _hover={{ transform: 'translateY(-5px)', shadow: 'xl' }}
            bg={bg}
        >
            <Image src={product.image} alt={product.name} h={48} w="full" objectFit="cover" />
            <Box p={4}>
                <Heading as="h3" size="md" mb={2}>
                    {product.name}
                </Heading>
                <Text fontWeight="bold" fontSize="xl" color={textColor} mb={4}>
                    ₱{product.price}
                </Text>
                <HStack spacing={2}>
                    <IconButton icon={<EditIcon />}
                        onClick={onOpen}
                    colorScheme='blue' />

                    <IconButton icon={<DeleteIcon />} onClick={() => handleDeleteProduct(product._id)} colorScheme='red' />
                </HStack>
            </Box>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Edit Product</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack spacing={4}>
                            <Input 
                                placeholder="Product Name"
                                 name="name"
                                 value={UpdateProduct.name}
                                 onChange={(e) => setUpdateProduct({ ...UpdateProduct, name: e.target.value })}
                                />
                        
                            <Input 
                                placeholder="Price"
                                name="price"
                                value={UpdateProduct.price}
                                onChange={(e) => setUpdateProduct({ ...UpdateProduct, price: e.target.value })}
                                />
                        
                            <Input 
                                placeholder="Product Image"
                                name="image"
                                value={UpdateProduct.image}
                                onChange={(e) => setUpdateProduct({ ...UpdateProduct, image: e.target.value })}
                                />
                        </VStack>   
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3}
                        onClick={() => handleUpdateProduct(product._id, UpdateProduct)}>
                            Update
                        </Button>
                        <Button ml={3} onClick={onClose}>
                            Cancel
                        </Button>
                    </ModalFooter>

                </ModalContent>


            </Modal>
        </Box>
    );
};

export default ProductCard