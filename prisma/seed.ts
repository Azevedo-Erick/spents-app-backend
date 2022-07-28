import { PrismaClient } from "@prisma/client";
import { type } from "os";

const prisma: PrismaClient = new PrismaClient();

prisma.$connect();
const seed = async () => {
    try {


        const categories = [
            {
                'id': '1',
                name: 'Food',
                color: '#ff0000',
            },
            {
                'id': '2',
                name: 'Transport',
                color: '#00ff00',
            },
            {
                'id': '3',
                name: 'Entertainment',
                color: '#0000ff',
            },
            {
                'id': '4',
                name: 'Education',
                color: '#ffff00',
            },
            {
                'id': '5',
                name: 'Health',
                color: '#ff00ff',
            }
        ]
        await prisma.category.createMany({
            data: categories
        })

        console.log("Categories seeded");

        const persons = [
            {
                id: '1',
                name: 'John Doe',
                email: 'johndoe@mail.com',
                password: '$2b$10$nUIoGyUyKNaFTfxCIYcgweGwP1s2V1FPZubKmEXwc0kjYbQy6baT2',
            },
            {
                id: '2',
                name: 'Jane Doe',
                email: 'janedoe@mail.com',
                password: '$2b$10$nUIoGyUyKNaFTfxCIYcgweGwP1s2V1FPZubKmEXwc0kjYbQy6baT2',
            },
            {
                id: '3',
                name: 'Jack Doe',
                email: 'jackdoe@mail.com',
                password: '$2b$10$nUIoGyUyKNaFTfxCIYcgweGwP1s2V1FPZubKmEXwc0kjYbQy6baT2',
            },



        ]
        await prisma.person.createMany({
            data: persons
        })

        console.log("Persons seeded");

        let generatedTransactions = []

        for (let i = 0; i < 10000; i++) {
            generatedTransactions.push({
                id: i.toString(),
                value: Math.floor(Math.random() * 100),
                categoryId: categories[Math.floor(Math.random() * categories.length)].id,
                personId: persons[Math.floor(Math.random() * persons.length)].id,
                date: new Date(Math.floor(Math.random() * 1000000000000)),
                type: Math.floor(Math.random() * 2) === 0 ? 'INCOME' : 'SPENT',
                title: 'Transaction ' + i,
                description: 'Transaction ' + i + ' description',
            })
        }
        await prisma.transaction.createMany({
            data: generatedTransactions
        })
        console.log("Transactions seeded");
    } catch (error) {
        console.log(error);
    } finally {
        prisma.$disconnect();
    }

}
seed()