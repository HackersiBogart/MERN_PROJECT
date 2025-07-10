import {create} from 'zustand';

export const useProductStore = create((set) => ({
    products: [],
    setProducts: (products) => set({products}),
    createProduct: async (newProduct) => {
        
    if (!newProduct.name || !newProduct.image || !newProduct.price) {
        return {
            success: false,
            message: "Please fill all fields"
        };
    }

    try {
        const res = await fetch('/api/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newProduct)
        });

        const contentType = res.headers.get("content-type");

        if (!res.ok) {
            let errorMsg = "Failed to create product";
            if (contentType && contentType.includes("application/json")) {
                const err = await res.json();
                errorMsg = err.message || errorMsg;
            }
            return { success: false, message: errorMsg };
        }

        const data = await res.json();
        set((state) => ({ products: [...state.products, data.data] }));
        return { success: true, message: "Product created successfully" };
    } catch (error) {
        console.error("Error in createProduct:", error.message);
        return { success: false, message: "Network or server error" };
    }
},
    fetchProducts: async () => {
        const res = await fetch('/api/products');
        const data = await res.json();
        set({ products: data.data });
    },
    deleteProduct: async (pid) => {
        const res = await fetch(`/api/products/${pid}`, {
            method: 'DELETE'
        });
        const data = await res.json();
        if (!data.success) {
            return { success: false, message: data.message };       
        }
        set((state) => ({
            products: state.products.filter((product) => product._id !== pid)
        }));
        return { success: true, message: "Product deleted successfully" };
    },   
    updateProduct: async (pid, updatedProduct) => {
        const res = await fetch(`/api/products/${pid}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedProduct)
        });
        const data = await res.json();
        if (!data.success) 
            return { success: false, message: data.message };
            set((state) => ({
                products: state.products.map((product) => 
                    (product._id === pid ? data.data : product)),
            }));
            return { success: true, message: data.message };

        },
}));