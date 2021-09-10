import * as React from 'react';
import firebase from 'firebase';
import Header from 'chungguo/components/Header';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import NoPermission from 'chungguo/public/assets/common/no-auth.svg';

interface Proxy {
  location: string,
  ip: string,
  port: string,
  encryption: string,
  passwd: string,
}

const config = JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_CONFIG);

const queryFirestore = () => {
  const db = firebase.firestore();
  return new Promise((resolve, reject) => {
    db.collection("ss").doc('servers').get().then((ss) => {
      resolve(ss?.data()?.data);
    }).catch(err => {
      resolve([]);
    });
  });
};

// Configure FirebaseUI.
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // The redirect URL parameter name for the sign-in success URL
  queryParameterForSignInSuccessUrl: 'redirect',
  // We will display Google and Phone as auth providers.
  signInOptions: [
    {
      provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
      recaptchaParameters: {
        size: 'invisible',
      },
      // https://github.com/firebase/firebaseui-web/blob/master/javascript/data/README.md
      defaultCountry: 'CN'
    },
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  ],
  callbacks: {
    signInSuccessWithAuthResult: () => true
  },
};

const initApp = () => {
  if (!firebase?.apps?.length) {
    firebase.initializeApp(config);
    return;
  }
  firebase.app();
};

/**
 * 配置信息表格 
 */
const ProxyListTable = (props: {
  proxyList: Proxy[],
}) => {
  const { proxyList } = props;

  return (
    <table className="table-auto border-collapse border my-10 mx-auto">
      <thead>
        <tr className="bg-gray-100">
          <td className="border px-2">地区</td>
          <td className="border px-2">IP地址</td>
          <td className="border px-2">服务器端口</td>
          <td className="border px-2">加密方式</td>
          <td className="border px-2">密码</td>
        </tr>
      </thead>
      <tbody>
        {
          proxyList.map((proxy) => {
            const { location, ip, port, encryption, passwd } = proxy;
            return (
              <tr key={ip} className="text-gray-500">
                <td className="border px-2">{location}</td>
                <td className="border px-2">{ip}</td>
                <td className="border px-2">{port}</td>
                <td className="border px-2">{encryption}</td>
                <td className="border px-2">{passwd}</td>
              </tr>
            )
          })
        }
      </tbody>
    </table>
  )
};

/** 未登录 */
const NoSignIn = () => {
  return (
    <article className="my-10">
      <section className="mx-auto w-52 mb-10">
        <h1 className="text-xl">登录</h1>
        <p className="text-sm text-gray-500">您可以选择使用以下账号登录</p>
      </section>
      <StyledFirebaseAuth
        uiConfig={uiConfig}
        firebaseAuth={firebase.auth()}
      />
    </article>
  )
};

export default function Auth() {
  // Local signed-in state.
  const [userInfo, setUserInfo] = React.useState(null);
  const [proxyList, setProxyList] = React.useState<Proxy[]>([]);

  const displayName = React.useMemo(() => userInfo?.displayName || null, [userInfo]);

  const signOut = React.useCallback(() => {
    firebase.auth().signOut()
  }, []);

  /**
   * 无权查看
   */
  const NoAuth = React.useCallback(() => {
    return (
      <section className="w-72 h-72 mx-auto mt-4">
        <NoPermission />
        <p className="text-center mt-4">对不起，您无权查看, 请 <a className="text-blue-600" onClick={signOut}>退出登陆</a></p>
      </section>
    )
  }, [signOut]);

  const InfoTable = React.useCallback(() => {
    return (
      <>
        <section className="w-80 mx-auto flex flex-col mt-20">
          <p className="text-center mb-4 text-xl">⚠️ 温馨提示您 {displayName}</p>
          <p className="text-red-600">1. 下表为采用 Shadowsocks 协议的科学上网配置信息, 仅供个人学习使用，请勿传播。</p>
          <p className="text-red-600">2. 默认您自愿遵守所在地区的相关法律法规，并对通过使用本页面提供的信息接入网络时产生的行为负责</p>
          <a className="text-sm text-center mt-4 text-blue-600" onClick={signOut}>退出登陆</a>
        </section>
        <ProxyListTable proxyList={proxyList} />
      </>
    );
  }, [
    displayName,
    proxyList,
    signOut
  ]);

  const PageComponent = React.useCallback(() => {
    if (!userInfo) {
      return <NoSignIn />;
    }

    if (!proxyList.length) {
      return <NoAuth />;
    }

    return <InfoTable />;
  }, [
    userInfo,
    proxyList,
    InfoTable,
    NoAuth
  ]);

  // Listen to the Firebase Auth state and set the local state.
  React.useEffect(() => {
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
      setUserInfo(user);
    });
    // Make sure we un-register Firebase observers when the component unmounts.
    return () => unregisterAuthObserver();
  }, []);

  React.useEffect(() => {
    if (!userInfo) {
      return;
    }

    queryFirestore().then((data: Proxy[]) => setProxyList(data))
  }, [userInfo]);

  return (
    <article>
      <Header />
      <PageComponent />
    </article>
  );
};

initApp();