import { PrismaClient } from "@prisma/client";


const seed = async (prisma: PrismaClient) => {
    prisma.category.createMany({
        data: [
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
    })
    prisma.person.createMany({
        data: [
            {
                id: '1',
                name: 'John Doe',
                email: 'johndoe@mail.com',
                password: '123456',
            },
            {
                id: '2',
                name: 'Jane Doe',
                email: 'janedoe@mail.com',
                password: '123456',
            },
            {
                id: '3',
                name: 'Jack Doe',
                email: 'jackdoe@mail.com',
                password: '123456',
            }

        ]
    })
    prisma.transaction.createMany({
        data: [
            {
                type: 'INCOME',
                date: '2020-01-01',
                title: 'Salary',
                description: 'Salary',
                value: 1000,
                personId: '1',
                categoryId: '1',
            },
            {
                type: 'SPENT',
                date: '2020-01-01',
                title: 'Food',
                description: 'Food',
                value: 100,
                personId: '1',
                categoryId: '1',
            },
            {
                type: 'INCOME',
                date: '2020-01-02',
                title: 'Salary',
                description: 'Salary',
                value: 1000,
                personId: '1',
                categoryId: '1',
            },
            {
                type: 'SPENT',
                date: '2020-01-02',
                title: 'Food',
                description: 'Food',
                value: 100,
                personId: '1',
                categoryId: '1',
            },
            {
                type: 'INCOME',
                date: '2020-01-03',
                title: 'Salary',
                description: 'Salary',
                value: 1000,
                personId: '1',
                categoryId: '1',
            },
            {
                type: 'SPENT',
                date: '2020-01-03',
                title: 'Food',
                description: 'Food',
                value: 100,
                personId: '1',
                categoryId: '1',
            },
            {
                type: 'INCOME',
                date: '2020-01-04',
                title: 'Salary',
                description: 'Salary',
                value: 1000,
                personId: '1',
                categoryId: '1',
            },
            {
                type: 'SPENT',
                date: '2020-01-04',
                title: 'Food',
                description: 'Food',
                value: 100,
                personId: '2',
                categoryId: '3',
            },
            {
                type: 'INCOME',
                date: '2020-01-05',
                title: 'Salary',
                description: 'Salary',
                value: 1000,
                personId: '2',
                categoryId: '3',
            },
            {
                type: 'SPENT',
                date: '2020-01-05',
                title: 'Food',
                description: 'Food',
                value: 100,
                personId: '2',
                categoryId: '3',
            },
            {
                type: 'INCOME',
                date: '2020-01-06',
                title: 'Salary',
                description: 'Salary',
                value: 1000,
                personId: '2',
                categoryId: '3',
            },
            {
                type: 'SPENT',
                date: '2020-01-06',
                title: 'Food',
                description: 'Food',
                value: 100,
                personId: '2',
                categoryId: '3',
            },
            {
                type: 'INCOME',
                date: '2020-01-07',
                title: 'Salary',
                description: 'Salary',
                value: 1000,
                personId: '2',
                categoryId: '3',
            },

        ]
    })
    return await prisma.person.findMany();
}
seed(new PrismaClient()).then((e) => {
    console.log(e);
    console.log('Seeded')
})