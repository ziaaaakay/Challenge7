import React, { useEffect, useState } from "react";
import "./PaymentPage.scss";
import { ReactComponent as CalendarIcon } from "../../assets/img/fi_calendar.svg";
import { ReactComponent as SettingIcon } from "../../assets/img/fi_settings.svg";
import { ReactComponent as UsersIcon } from "../../assets/img/fi_users.svg";
import { Accordion, Button, Tab, Tabs } from "react-bootstrap";
import { PaymentMethod } from "../../components/PaymentMethod/PaymentMethod";
import { Link, useNavigate } from "react-router-dom";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import InvoicePDF from "../../assets/doc/invoice.pdf";
import "@react-pdf-viewer/core/lib/styles/index.css";
import store from "../../redux/store/store";
import axios from "axios";

export const PaymentPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [orderedCar, setOrderedCar] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("accessToken") === null) {
      navigate("/");
      return;
    }

    const carId = store.getState().accountDataReducers.order.order;
    if (carId) {
      const car = store
        .getState()
        .getDataReducers.carData.find((car) => car.id === carId);
      setOrderedCar(car);
    }
  }, []);

  const handleConfirmMethod = (method) => {
    console.log(`Metode pembayaran: ${method}`);
    setActiveTab(1);
  };

  const handleConfirmPayment = async () => {
    const accessToken = localStorage.getItem("accessToken");
    const formData = new FormData();
    formData.append("start_rent_at", "2022-10-05");
    formData.append("finish_rent_at", "2022-10-12");
    formData.append("car_id", orderedCar.id);

    console.log(accessToken);
    const header = {
      access_token: accessToken,
    };

    var config = {
      method: "post",
      url: process.env.REACT_APP_API + "/customer/order",
      headers: header,
      data: formData,
    };

    axios(config)
      .then((res) => {
        console.log(`Pembayaran berhasil`);
        console.log(`${JSON.stringify(res.data)}`);
        setActiveTab(2);
      })
      .catch((err) => {
        console.log(`Pembayaran gagal + ${err}`);
      });
  };

  return (
    <div className="payment-page">
      <div className="banner"></div>
      <div className="content-container d-flex flex-column align-items-center">
        {orderedCar !== null && activeTab === 0 && (
          <MethodPage
            handleBack={() => navigate("/")}
            handleConfirm={handleConfirmMethod}
            carData={orderedCar}
          />
        )}
        {orderedCar !== null && activeTab === 1 && (
          <PayingPage
            handleBack={() => setActiveTab(0)}
            handleConfirmPayment={handleConfirmPayment}
            carData={orderedCar}
          />
        )}
        {orderedCar !== null && activeTab === 2 && <TicketPage />}
      </div>
    </div>
  );
};

const MethodPage = ({ handleBack, handleConfirm, carData }) => {
  const [method, setMethod] = useState("");

  const changeMethod = (newMethod) => {
    if (method === newMethod) {
      setMethod("");
      return;
    }

    setMethod(newMethod);
  };

  return (
    <>
      <div className="top-bar">
        <div className="back-button" onClick={handleBack}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-arrow-left-short"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"
            />
          </svg>
        </div>
        <div className="description">
          <span className="bold-text">Pembayaran</span>
        </div>
        <div className="steps">
          <div className="step">
            <div className="circle done">
              <span>1</span>
            </div>
            <span className="text">Pilih Metode</span>
          </div>
          <div className="line"></div>
          <div className="step">
            <div className="circle">
              <span>2</span>
            </div>
            <span className="text">Bayar</span>
          </div>
          <div className="line"></div>
          <div className="step">
            <div className="circle">
              <span>3</span>
            </div>
            <span className="text">Tiket</span>
          </div>
        </div>
      </div>
      <div className="detail-order box-container">
        <h3>Detail Pesanan</h3>
        <div className="detail-container">
          <div className="detail-group">
            <h5>Tipe Driver</h5>
            <span>Dengan Sopir</span>
          </div>
          <div className="detail-group">
            <h5>Tanggal</h5>
            <span>-</span>
          </div>
          <div className="detail-group">
            <h5>Waktu Jemput/Antar</h5>
            <span>-</span>
          </div>
          <div className="detail-group">
            <h5>Jumlah Penumpang (opsional)</h5>
            <span>-</span>
          </div>
        </div>
      </div>
      <div className="content-2">
        <div className="select-method box-container">
          <h3>Pilih Metode Pembayaran</h3>
          <p>
            Kamu bisa membayar dengan transfer melalui ATM, Internet Banking
            atau Mobile Banking
          </p>
          <div className="method-list">
            <PaymentMethod
              name="BCA Transfer"
              selected={method === "BCA"}
              onClick={() => changeMethod("BCA")}
            />
            <div className="line"></div>
            <PaymentMethod
              name="BNI Transfer"
              selected={method === "BNI"}
              onClick={() => changeMethod("BNI")}
            />
            <div className="line"></div>
            <PaymentMethod
              name="Mandiri Transfer"
              selected={method === "Mandiri"}
              onClick={() => changeMethod("Mandiri")}
            />
            <div className="line"></div>
          </div>
        </div>
        <div className="payment-detail box-container">
          <h3>{carData?.name}</h3>
          <div className="specs-desc">
            <span className="specs-item">
              <UsersIcon />
              {carData?.category}
            </span>
            <span className="specs-item">
              <SettingIcon />
              Manual
            </span>
            <span className="specs-item">
              <CalendarIcon />
              Tahun 2020
            </span>
          </div>
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                <span className="default-text">Total</span>
                <span className="bold-text">
                  {convertPriceToRupiah(carData?.price)}
                </span>
              </Accordion.Header>
              <Accordion.Body>
                <div className="price-group">
                  <span className="bold-text">Harga</span>
                  <ul>
                    <li>
                      <div className="item">
                        <span className="default-text">
                          1 Mobil dengan sopir
                        </span>
                        <span className="default-text">
                          {convertPriceToRupiah(carData.price)}
                        </span>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="price-group">
                  <span className="bold-text">Biaya Lainnya</span>
                  <ul>
                    <li>
                      <div className="item">
                        <span className="default-text">Pajak</span>
                        <span className="green default-text">Termasuk</span>
                      </div>
                    </li>
                    <li>
                      <div className="item">
                        <span className="default-text">Biaya Makan Sopir</span>
                        <span className="green default-text">Termasuk</span>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="price-group">
                  <span className="bold-text">Belum Termasuk</span>
                  <ul>
                    <li>
                      <div className="item">
                        <span className="default-text">Bensin</span>
                        <span className="green default-text"></span>
                      </div>
                    </li>
                    <li>
                      <div className="item">
                        <span className="default-text">Tol dan Parkir</span>
                        <span className="green default-text"></span>
                      </div>
                    </li>
                  </ul>
                </div>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
          <div className="total-section">
            <hr />
            <div className="total-price">
              <span className="bold-text">Total</span>
              <span className="bold-text">
                {convertPriceToRupiah(carData ? carData.price : 0)}
              </span>
            </div>
            <Button
              variant="success"
              disabled={method === ""}
              onClick={() => handleConfirm(method)}
            >
              Bayar
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

const PayingPage = ({ handleBack, handleConfirmPayment, carData }) => {
  const [confirm, setConfirm] = useState(false);

  return (
    <>
      <div className="top-bar">
        <div className="back-button" onClick={handleBack}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-arrow-left-short"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"
            />
          </svg>
        </div>
        <div className="description">
          <span className="bold-text">Pembayaran</span>
          <span className="default-text">Order ID: XXXXX</span>
        </div>
        <div className="steps">
          <div className="step">
            <div className="circle done">
              <span>1</span>
            </div>
            <span className="text">Pilih Metode</span>
          </div>
          <div className="line"></div>
          <div className="step">
            <div className="circle done">
              <span>2</span>
            </div>
            <span className="text">Bayar</span>
          </div>
          <div className="line"></div>
          <div className="step">
            <div className="circle">
              <span>3</span>
            </div>
            <span className="text">Tiket</span>
          </div>
        </div>
      </div>
      <div className="container-2">
        <div className="left-side">
          <div className="time-section box-container">
            <div className="desc">
              <span className="bold-text">Selesaikan Pembayaran Sebelum</span>
              <span className="default-text">
                Rabu, 19 Jun 2022 jam 13.00 WIB
              </span>
            </div>
            <div className="time">
              <span className="pink-box">23</span> :{" "}
              <span className="pink-box">23</span> :{" "}
              <span className="pink-box">23</span>
            </div>
          </div>
          <div className="transfer-section box-container">
            <span className="bold-text">Lakukan Transfer ke</span>
            <div className="method">
              <div className="method-icon">
                <span>ICON</span>
              </div>
              <div className="method-desc">
                <span className="default-text">BCA Transfer</span>
                <span className="default-text">a.n Binar Car Rental</span>
              </div>
            </div>
            <div className="copy-field">
              <span className="light-text">Nomor Rekening</span>
              <div className="field">XXX-XXX-XXX</div>
            </div>
            <div className="copy-field">
              <span className="light-text">Total Bayar</span>
              <div className="field">
                <span className="bold-text">
                  {convertPriceToRupiah(carData?.price)}
                </span>
              </div>
            </div>
          </div>
          <div className="instruction-section box-container">
            <span className="bold-text">Instruksi Pembayaran</span>
            <Tabs
              defaultActiveKey="bca"
              id="uncontrolled-tab-example"
              className="mb-3"
            >
              <Tab eventKey="bca" title="ATM BCA">
                <div className="list-group">
                  <ol>
                    <li>Tidak termasuk biaya makan sopir Rp 75.000/hari</li>
                    <li>
                      Jika overtime lebih dari 12 jam akan ada tambahan biaya Rp
                      20.000/jam
                    </li>
                    <li>Tidak termasuk akomodasi penginapan</li>
                    <li>Tidak termasuk biaya makan sopir Rp 75.000/hari</li>
                    <li>
                      Jika overtime lebih dari 12 jam akan ada tambahan biaya Rp
                      20.000/jam
                    </li>
                    <li>Tidak termasuk akomodasi penginapan</li>
                    <li>Tidak termasuk biaya makan sopir Rp 75.000/hari</li>
                    <li>
                      Jika overtime lebih dari 12 jam akan ada tambahan biaya Rp
                      20.000/jam
                    </li>
                    <li>Tidak termasuk akomodasi penginapan</li>
                  </ol>
                </div>
              </Tab>
              <Tab eventKey="mbca" title="M-BCA">
                <div className="list-group">
                  <ol>
                    <li>Tidak termasuk biaya makan sopir Rp 75.000/hari</li>
                    <li>
                      Jika overtime lebih dari 12 jam akan ada tambahan biaya Rp
                      20.000/jam
                    </li>
                    <li>Tidak termasuk akomodasi penginapan</li>
                    <li>Tidak termasuk biaya makan sopir Rp 75.000/hari</li>
                    <li>
                      Jika overtime lebih dari 12 jam akan ada tambahan biaya Rp
                      20.000/jam
                    </li>
                    <li>Tidak termasuk akomodasi penginapan</li>
                    <li>Tidak termasuk biaya makan sopir Rp 75.000/hari</li>
                    <li>
                      Jika overtime lebih dari 12 jam akan ada tambahan biaya Rp
                      20.000/jam
                    </li>
                    <li>Tidak termasuk akomodasi penginapan</li>
                  </ol>
                </div>
              </Tab>
              <Tab eventKey="bcaklik" title="BCA Klik">
                <div className="list-group">
                  <ol>
                    <li>Tidak termasuk biaya makan sopir Rp 75.000/hari</li>
                    <li>
                      Jika overtime lebih dari 12 jam akan ada tambahan biaya Rp
                      20.000/jam
                    </li>
                    <li>Tidak termasuk akomodasi penginapan</li>
                    <li>Tidak termasuk biaya makan sopir Rp 75.000/hari</li>
                    <li>
                      Jika overtime lebih dari 12 jam akan ada tambahan biaya Rp
                      20.000/jam
                    </li>
                    <li>Tidak termasuk akomodasi penginapan</li>
                    <li>Tidak termasuk biaya makan sopir Rp 75.000/hari</li>
                    <li>
                      Jika overtime lebih dari 12 jam akan ada tambahan biaya Rp
                      20.000/jam
                    </li>
                    <li>Tidak termasuk akomodasi penginapan</li>
                  </ol>
                </div>
              </Tab>
              <Tab eventKey="ibanking" title="Internet Banking">
                <div className="list-group">
                  <ol>
                    <li>Tidak termasuk biaya makan sopir Rp 75.000/hari</li>
                    <li>
                      Jika overtime lebih dari 12 jam akan ada tambahan biaya Rp
                      20.000/jam
                    </li>
                    <li>Tidak termasuk akomodasi penginapan</li>
                    <li>Tidak termasuk biaya makan sopir Rp 75.000/hari</li>
                    <li>
                      Jika overtime lebih dari 12 jam akan ada tambahan biaya Rp
                      20.000/jam
                    </li>
                    <li>Tidak termasuk akomodasi penginapan</li>
                    <li>Tidak termasuk biaya makan sopir Rp 75.000/hari</li>
                    <li>
                      Jika overtime lebih dari 12 jam akan ada tambahan biaya Rp
                      20.000/jam
                    </li>
                    <li>Tidak termasuk akomodasi penginapan</li>
                  </ol>
                </div>
              </Tab>
            </Tabs>
          </div>
        </div>
        <div className="right-side">
          <div className="confirm-section box-container">
            {!confirm && (
              <>
                <div className="default-text">
                  Klik konfirmasi pembayaran untuk mempercepat proses pengecekan
                </div>
                <Button
                  variant="success"
                  className="w-100 p-2 mt-3"
                  onClick={() => setConfirm(true)}
                >
                  Konfirmasi Pembayaran
                </Button>
              </>
            )}
            {confirm && (
              <>
                <div className="header">
                  <span className="bold-text">Konfirmasi Pembayaran</span>
                  <div className="time">
                    <span className="pink-box">09</span> :{" "}
                    <span className="pink-box">59</span>
                  </div>
                </div>
                <span className="default-text">
                  Terima kasih telah melakukan konfirmasi pembayaran.
                  Pembayaranmu akan segera kami cek tunggu kurang lebih 10 menit
                  untuk mendapatkan konfirmasi.
                </span>
                <div className="proof">
                  <span className="bold-text">Upload Bukti Pembayaran</span>
                  <span className="default-text">
                    Untuk membantu kami lebih cepat melakukan pengecekan. Kamu
                    bisa upload bukti bayarmu
                  </span>
                </div>
                <Button
                  variant="success"
                  className="w-100 p-2 mt-3"
                  onClick={() => handleConfirmPayment()}
                >
                  Upload
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

const TicketPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="top-bar">
        <div className="back-button" onClick={() => navigate("/")}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-arrow-left-short"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"
            />
          </svg>
        </div>
        <div className="description">
          <span className="bold-text">Ticket</span>
          <span className="default-text">Order ID: XXXXX</span>
        </div>
        <div className="steps">
          <div className="step">
            <div className="circle done">
              <span>1</span>
            </div>
            <span className="text">Pilih Metode</span>
          </div>
          <div className="line"></div>
          <div className="step">
            <div className="circle done">
              <span>2</span>
            </div>
            <span className="text">Bayar</span>
          </div>
          <div className="line"></div>
          <div className="step">
            <div className="circle done">
              <span>3</span>
            </div>
            <span className="text">Tiket</span>
          </div>
        </div>
      </div>
      <div className="ticket-content">
        <div className="check-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="#fff"
            className="bi bi-check-lg"
            viewBox="0 0 16 16"
          >
            <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
          </svg>
        </div>
        <span className="bold-text">Pembayaran Berhasil</span>
        <span className="light-text">
          Tunjukkan invoice ini ke petugas BCR di titik temu.
        </span>
        {/* Invoice */}
        <div className="invoice box-container">
          <div className="top-content">
            <span className="bold-text">Invoice</span>
            <Link
              to={InvoicePDF}
              className="download-button"
              target="_blank"
              download
            >
              Unduh
            </Link>
          </div>
          <div className="invoice-viewer">
            <div
              style={{
                border: "1px solid rgba(0, 0, 0, 0.3)",
                height: "100%",
              }}
            >
              <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.13.216/build/pdf.worker.min.js">
                <Viewer fileUrl={InvoicePDF} />
              </Worker>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const convertPriceToRupiah = (price) => {
  return Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  })
    .format(price)
    .split(",")[0];
};
