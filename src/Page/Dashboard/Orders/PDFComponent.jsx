import { useState } from 'react';
import { Document, Page, Text, View, StyleSheet, Font, Image } from '@react-pdf/renderer';

// Import a Bengali font
import bengaliFont from './NotoSansBengali-VariableFont_wdth,wght.ttf';

// Register the Bengali font
Font.register({
    family: 'NotoSansBengali',
    src: bengaliFont,
});

const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        position: 'relative',
        backgroundColor: '#ffffff'
    },
    section: {
        padding: 10,
        flexGrow: 1,
        marginBottom: 10,
        position: 'relative',
        zIndex: 1,
    },
    bengaliText: {
        fontFamily: 'NotoSansBengali', // Use the registered Bengali font
        fontSize: 12,
        textAlign: 'left',
        marginBottom: 3
    },
    header: {
        fontSize: 12,
        borderBottom: '1px solid #000',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 10,
        paddingTop: 15,
        backgroundColor: '#EFF0F4'
    },
    companyDetails: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingLeft: 250,
        paddingRight: 80,
    },
    companyName: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingBottom: 5,
    },
    logo: {
        width: 150,
        height: 100,
        marginTop: 20,
        marginLeft: 0,
    },
    customerInfo: {
        padding: 20,
        marginTop: 0,
        fontSize: 12,
        borderBottom: '1px solid #000'
    },
    orderInfo: {
        marginBottom: 20,
        fontSize: 16,
        margin: 10
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    itemName: {
        flexGrow: 1,
    },
    footer: {
        position: 'absolute',
        bottom: 30,
        left: 40,
        right: 40,
        textAlign: 'center',
    },
    customerInfoTitle: {
        fontSize: 16,
        paddingBottom: 10
    },
    table: {
        width: '100%',
        border: '1px solid #000',
        borderCollapse: 'collapse',
        marginBottom: 10,
        margin: 5,
        borderRadius: '5px'
    },
    tableRow: {
        flexDirection: 'row',
        borderBottom: '1px solid #000'
    },
    tableCell: {
        flex: 1,
        padding: 5,
        fontSize: 12,
        textAlign: 'center',
        borderRight: '1px solid #000',
    },
    productImage: {
        width: 40,
        height: 40,
        padding: 2
    },
    tableCellName: {
        width: 260,
        borderRight: '1px solid #000',
        borderLeft: '1px solid #000',
        fontSize: 12,
        padding: 5,
    },
    tableCellImage: {
        width: 40,
        fontSize: 12,
        padding: 5,
    },
    grandTotal: {
        textAlign: 'right',
        border: '1px solid #000',
        backgroundColor: 'rgb(239, 246 ,255, 0.3)',
        marginRight: 10,
        marginLeft: 320,
        padding: 5,
        paddingRight: 10,
        borderRadius: '5px'
    },
    totals: {
        flexDirection: 'column',
        alignItems: 'flex-end',
        marginTop: 10,
    },
    totalItem: {
        marginBottom: 5,
        fontSize: 14,
    },
    total: {
        marginBottom: 5,
        fontSize: 16,
        color : '#84a793',
        textAlign: 'right',
    },
    watermark: {
        opacity: 0.1, // Adjust opacity to make the watermark less prominent
        width: '50%', // Adjust the width of the watermark image as needed
        height: 'auto', // Maintain aspect ratio
    },
    watermarkContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: -1,
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    thanks: {
        margin: 20,
        border: '1px solid #000',
        borderRadius: '5px',
        padding: 6,
        width: '90%',
        position: 'absolute',
        bottom: 10,
        backgroundColor: 'rgb(239, 246 ,255, 0.3)'
    },
    thanksText: {
        fontFamily: 'NotoSansBengali', // Use the registered Bengali font
        fontSize: 12,
        textAlign: 'left',
    },
    grandTotalUnderline: {
        borderBottom: '1px solid #000',
        paddingBottom: 2,
        fontSize: 14,
        marginBottom: 5,
    },
    tableNameCol: {
        width: 260,
        borderRight: '1px solid #000',
        borderLeft: '1px solid #000',
        padding: 5,
        fontSize: 12,
        textAlign: 'center'
    }
});

const PDFComponent = ({ orderData }) => {
    const [thanks, setThanks] = useState('আপনার অর্ডার শুধুমাত্র একটি লেনদেন নয়; এটা আপনি আমাদের প্রতি আস্থার প্রতিফলন। আপনার যাত্রার অংশ হতে পেরে আমরা আনন্দিত।')
    console.log(orderData);
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.watermarkContainer}>
                    <Image style={styles.watermark} src='https://i.ibb.co/tJ909XV/23095971-1122-ai.png' />
                </View>
                <View style={styles.section}>
                    <View style={styles.header}>
                        <Image style={styles.logo} src="https://i.ibb.co/tJ909XV/23095971-1122-ai.png" />
                        <View style={styles.companyDetails}>
                            <Text style={styles.companyName}>Bongo Kids</Text>
                            <Text>Senpara, Mirpur 10</Text>
                            <Text>+01985004919</Text>
                            <Text>bongokidsshop@gmail.com</Text>
                        </View>
                    </View>
                    <View style={styles.customerInfo}>
                        <Text style={styles.customerInfoTitle}>Customer Information:</Text>
                        <Text style={styles.bengaliText}>Name: {orderData.name}</Text>
                        <Text style={styles.bengaliText}>Address: {orderData.address}</Text>
                        <Text style={styles.bengaliText}>Phone: {orderData.phone}</Text>
                        <Text style={styles.bengaliText}>Email: {orderData?.email}</Text>
                        <Text style={styles.bengaliText}>Order Date: {orderData.date}</Text>
                        <Text style={styles.bengaliText}>Order Time: {orderData.time}</Text>
                    </View>
                    <View style={styles.orderInfo}>
                        <Text style={styles.orderInfo}>Order Information:</Text>

                        <View style={styles.table}>
                            <View style={styles.tableRow}>
                                <Text style={styles.tableCellImage}>Image</Text>
                                <Text style={styles.tableNameCol}>Name</Text>
                                <Text style={styles.tableCell}>Quantity</Text>
                                <Text style={styles.tableCell}>Price</Text>
                                <Text style={styles.tableCell}>Total Price</Text>
                            </View>
                            {
                                orderData.product?.map(product =>
                                    <View style={styles.tableRow}>
                                        <Image style={styles.productImage} src={product.image[0]} />
                                        <Text style={styles.tableCellName}>{product.productName.length > 35 ? product.productName.slice(0, 35) : product.productName}{product.productName.length > 35 ? '....' : ''}</Text>
                                        <Text style={styles.tableCell}>{product.quantity}</Text>
                                        <Text style={styles.tableCell}>{product.discountPrice}</Text>
                                        <Text style={styles.tableCell}>{parseInt(product.quantity) * parseInt(product.discountPrice)}</Text>
                                    </View>
                                )
                            }
                        </View>
                    </View>
                    <View style={styles.grandTotal}>
                        <View style={styles.totals}>
                            <Text style={styles.totalItem}>Product Price: {orderData.totalPrice} Taka </Text>
                            <Text style={styles.grandTotalUnderline}>Shipping Cost: {orderData.ShippingCost} Taka </Text>
                            <Text style={styles.total}>Total: {orderData.totalPrice + orderData.ShippingCost} Taka </Text>
                        </View>
                    </View>
                    <View style={styles.thanks}>
                        <Text style={styles.thanksText}>{thanks}</Text>
                    </View>
                </View>
            </Page>
        </Document>
    );
};

export default PDFComponent;