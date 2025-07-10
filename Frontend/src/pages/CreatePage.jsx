import { useProductStore } from '@/store/product';
import { Container, useColorModeValue, VStack, Heading
, Box, Input, Button,
useToast} from '@chakra-ui/react';
import {useState} from 'react';
import { create } from 'zustand';


const CreatePage = () => {
    const [newProduct, setNewProduct] = useState({
        name: "",
        price: "",
        image: ""
    });

    const{ createProduct } = useProductStore();
    const toast = useToast();
    const handleAddProduct = async() => {
        const { success, message } = await createProduct(newProduct);
        if (!success) {
            toast({
                title: "Error",
                description: message,
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }else {
            toast({
                title: "Success",
                description: "Product created successfully",
                status: "success",
                duration: 5000,
                isClosable: true,
            });
            return;
        }
        setNewProduct({
            name: "", price: "", image: ""
        });
    };


  return (<Container maxW={"container.sm"}>
    <VStack
        spacing={8}
    >
        <Heading as = {"h1"} size = {"2xl"} textAlign={"center"} mb={8}>
            Create Product
        </Heading>
        <Box
        w={"full"} bg={useColorModeValue("white", "gray.800")} p={6}
        rounded={"lg"} shadow={"md"}>
            <VStack spacing={4}>
                <Input 
                placeholder="Product Name"
                name="name"
                value = {newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct,name: e.target.value})} />

                <Input 
                placeholder="Price"
                name="price"
                value = {newProduct.price}
                onChange={(e) => setNewProduct({ ...newProduct,price: e.target.value})} />

                <Input 
                placeholder="Product Image"
                name="image"
                value = {newProduct.image}
                onChange={(e) => setNewProduct({ ...newProduct,image: e.target.value})} />

               <Button colorScheme={"blue"} onClick={handleAddProduct} w={"full"}>

                Add Product

               </Button>

            </VStack>    
        </Box>
    </VStack>
  </Container>
  )

}

export default CreatePage;