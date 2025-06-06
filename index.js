const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const PORT = 3000;
const allowedDomains = ['live.statusarea.link','hshr.site','www.statusarea.link', 'statusarea.link','https://hshr-play.blogspot.com'];
//app.set('public', path.join(__dirname, 'public'));
// Middleware to check the Referer header
app.use((req, res, next) => {
    const referer = req.get('Referer');
    if (!referer || !allowedDomains.some(domain => referer.includes(domain))) {
        return res.send("You tried to access a page you did not have prior authorization for. <br>kindly visit <a href='https://www.statusarea.link'>www.statusarea.link</a>");

    }
    next();
});
 app.use((req, res, next) => {  
    res.setHeader('Cache-Control', 'no-store');  
    next();  
  }); 
app.use(express.static(path.resolve(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.set('public', path.join(__dirname, 'public'));

app.get("/", (req, res) => {
  // Load HTML file
  const htmlPath = path.join(__dirname, "public", "index.html");
  let html = fs.readFileSync(htmlPath, "utf8");

  // Your full JavaScript here as a string (you can move this to another file and read with fs if it's too long)
  const injectedScript = `
    <script type="text/javascript">
        function getParameterByName(name) {
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(window.location.href);
        if (!results) return null;
        return !results[2] ? '' : decodeURIComponent(results[2].replace(/\+/g, " "));
    }

    // Get parameters from the URL
    var id = getParameterByName('id');
    var dynamicUrl = getParameterByName('url');
    var dash = getParameterByName('dash');
    var key = getParameterByName('key');
    var key2 = getParameterByName('key2');
    var stream = getParameterByName('stream'); // For MP4 files
    var aut = getParameterByName('aut') == 1 ? true : false;

    // JWPlayer Configurations for different scenarios
    var ConfiguracionCanales = {
            "USANETWORK": {
                url: "https://cfrt.stream.peacocktv.com/Content/CMAF_OL1-CTR-4s/Live/channel(usa-west)/master.mpd",
                k1: "252a671825ba31ec8433f978c32ccf6d",
                k2: "ee560759ecc8d2274df2e63fcef56915"
            },

            "USANETWORK2": {
                url: "https://fsly.stream.peacocktv.com/Content/CMAF_OL1-CTR-4s/Live/channel(usa-west)/master.mpd?deviceId=YzM0NDA0MTItMGYyMC0zNGQ0LTliMjMtNDY4MjE1ZjA5NmZj",
                k1: "252a671825ba31ec8433f978c32ccf6d",
                k2: "ee560759ecc8d2274df2e63fcef56915"
            },
             "ASTRO4": {
        url: "https://linearjitp-playback.astro.com.my/dash-wv/linear/2506/default_ott.mpd",
  k1: "79f4028730acca9ab8b00f26158ddb10",
  k2: "91febe843c08c7cc523efd827292e40e"
},
           "ASTROSUPERSPORT": {
        url: "https://linearjitp-playback.astro.com.my/dash-wv/linear/5076/default_primary.mpd",
  k1: "89c10c7ef0af145be7d6e88dec090b10",
  k2: "80558606a13a99d2c543872d8899ced0"
},

           "ASTROGO1": {
        url: "https://linearjitp-playback.astro.com.my/dash-wv/linear/9989/default_primary.mpd",
  k1: "de761cd285aa2b1c1620d16ddbade010",
  k2: "f12de5f0de92c52f841705d9d6449d3a"
},

            "ASTROGO2": {
        url: "https://linearjitp-playback.astro.com.my/dash-wv/linear/9988/default_primary.mpd",
  k1: "8ab014de03c31a84a835583c348a5e10",
  k2: "5ed727c3f28bac59aa3e5914f5ad455c"
},

               "ASTROGO3": {
        url: "https://linearjitp-playback.astro.com.my/dash-wv/linear/9987/default_primary.mpd",
  k1: "8d580c263ffde691b4249dfcac43fd10",
  k2: "f3148d1e737dece3554b889868831659"
},

           "SETENA": {
        url: "https://cdnlb.tvplayhome.lt/live/eds/Setanta26_HD_HVC/GO3_LIVE_DASH_HVC/Setanta26_HD_HVC.mpd",
  k1: "1658b366669f443384cefee3ec401d65",
  k2: "CCE0929C1AB140670002D4C253C73654"
},

               "ASTROGO4": {
        url: "https://linearjitp-playback.astro.com.my/dash-wv/linear/9986/default_primary.mpd",
  k1: "cb18945925e65d411fbb986d72531010",
  k2: "15ff74ae1064c5f2fb00d2995fa88955"
},

           "SPOTV1": {
       url: "https://linearjitp-playback.astro.com.my/dash-wv/dashiso/5148/default.mpd",
  k1: "e7c650ac72dcd0311411832a8271bb10",
  k2: "ea8fa43cc7102e481cd441c58b2ecb08"
},

           "SPOTV": {
       url: "https://linearjitp-playback.astro.com.my/dash-wv/linear/5058/default.mpd",
  k1: "c0e1804aa1d9fd9c41c41bf0f61a5f10",
  k2: "758823e4eabb6e4c8c036d073db46b8c"
},

            "SPOTV2": {
        url: "https://linearjitp-playback.astro.com.my/dash-wv/linear/5079/default_primary.mpd",
  k1: "5efd26da5001363b4d6fa4a9c812ad10",
  k2: "ed6d67d953d14b026b2602cf8846577e"
},
           "PEACOCK": {
                url: "https://fsly.stream.peacocktv.com/Content/CMAF_CTR-4s/Live/channel(vc1021n07j)/master.mpd",
                k1: "002046c9a49b9ab1cdb6616bec5d26c3",
                k2: "d2f92f6b7edc9a1a05d393ba0c20ef9e"
            },

            "GO3": {
                url: "https://cdnlb.tvplayhome.lt/live/eds/TV3_Sport2_HD_HVC/GO3_LIVE_DASH_AVC/TV3_Sport2_HD_HVC.mpd",
                k1: "3fc5ce88ae24460bafa447b53ab5f548",
                k2: "476a55ef72c5e27e310668b1667da615"
            },
            "NRK1_NO": {
                url: "https://rikstv-live-scalstrm.telenorcdn.net/live/rikstv/64393b4f1dbc891fd41f5242/manifest.mpd",
                k1: "01010101010101010101010101010101",
                k2: "01010101010101010101010101010101"
            },
        "CTV": {
                url: "https://pe-fa-lp01a.9c9media.com/live/CFTO/p/dash/20000001/9117ec94ec99c195/manifest.mpd",
                k1: "10f7768b8eb5be6d48c1baaf1fb891a1",
                k2: "9b029683d78a43cb9e8738f17220c37e"
        },
            "CTV": {
                url: "https://pe-fa-lp01a.9c9media.com/live/CFTO/p/dash/20000001/9117ec94ec99c195/manifest.mpd",
                 k1: "31599f01aa4da9cdd75711f495279e27",
                k2: "a68ca2b689516982cb543a9a60f53263"
            },
            "NPO1": {
                url: "https://nlziet-live.akamaized.net/L6/76fd047c/c427bd9d.isml/.mpd",
                k1: "7545f9301bf94e7a9132dccf32920e51",
                k2: "94fc134c1b1cb1ea9075781417eca48b"
            },
            "TELEMUNDO": {
                url: "https://live-oneapp-prd-news.akamaized.net/Content/CMAF_OL1-CTR-4s/Live/channel(WNJU)/master.mpd",
                k1: "e1f756cffcc838e28a3da6541c00ee8b",
                k2: "1444b1c17a5c1f78435de12dcff47c8e"
            },
            "TNT_ALTER": {
                url: "https://cdn-lumen01.sensa.com.ar/live/eds/TNTSports/live_dash_cld/TNTSports.mpd",
                k1: "be65e5985fa04a49af310f0a92a0260a",
                k2: "1acb5ff7b0dbfdf19c4dca1aabfaaa11"
            },
            "SSC1": {
                url: "https://ssc1-ak.akamaized.net/out/v1/c696e4819b55414388a1a487e8a45ca1/index.mpd",
                k1: "d84c325f36814f39bbe59080272b10c3",
                k2: "550727de4c96ef1ecff874905493580f"
            },
            "SSC2": {
                url: "https://ssc2-ak.akamaized.net/out/v1/a16db2ec338a445a82d9c541cc9293f9/index.mpd",
                k1: "8BCFC55359E24BD7AD1C5560A96DDD3C",
                k2: "b5dcf721ab522af92a9d3bf0bd55b596"
            },
            "SSC3": {
                url: "https://ssc3-ak.akamaized.net/out/v1/42e86125555242aaa2a12056832e7814/index.mpd",
                k1: "7de5dd08ad8041d586c2f16ccc9490a1",
                k2: "5e1503f3398b34f5099933fedab847ef"
            },
            "SSC4": {
                url: "https://ssc4-ak.akamaized.net/out/v1/5267ea5772874b0db24559d643eaad93/index.mpd",
                k1: "5c672f6b85a94638872d0214f7806ed4",
                k2: "bf8756fbb866ee2d5c701c2289dd8de3"
            },
            "SSC5": {
                url: "https://ssc5-ak.akamaized.net/out/v1/99289eac5a7b4319905da595afbd792b/index.mpd",
                k1: "c88b512b17ab4f6cb09eb0ff4a1056ed",
                k2: "adc08ee1c20a734972a55c9aebbd1888"
            },
            "SSC_EXTRA1": {
                url: "https://ssc-extra1-ak.akamaized.net/out/v1/647c58693f1d46af92bd7e69f17912cb/index.mpd",
                k1: "ecbc9e6fe6b145efb6658fb5cf7427f8",
                k2: "03c17e28911f71221acbc0b11f900401"
            },
            "SSC_EXTRA2": {
                url: "https://ssc-extra2-ak.akamaized.net/out/v1/8b70de2b70d447ba8a7450ba90926a2d/index.mpd",
                k1: "4d89249bd4ca4ebc9e70443265f9507d",
                k2: "cf074ffd2646c9c2f8513b47fa57bc30"
            },
            "SSC_EXTRA3": {
                url: "https://ssc-extra3-ak.akamaized.net/out/v1/8f1c6c3f05ef4284a64b342891bd85ae/index.mpd",
                k1: "98cfd6fd4812497fb24dc75f7545f2ee",
                k2: "d3006ee69e77b25939728ebf30d3180a"
            },
            "SSC_NEWS": {
                url: "https://ssc-news-live-ak.akamaized.net/out/v1/ef466f43623c4bbaa3f905b566ec35ea/index.mpd",
                k1: "3d04975236a44f62857d181597705ee6",
                k2: "362133e9cb13189ad4fe095ced216f60"
            },
              "ESPN_1": {
                url: "https://cdn.trimi.com.ar/live/sm-live/ESPN/sa_live_dash/ESPN.mpd",
                k1: "d83d5cda097a41be9534879cfb1ff612",
                k2: "0eb240b8c562073218be9fd67e155a74"
            },
            "ESPN_NL": {
                url: "https://da-d436234320010b88000103020000000000000005.id.cdn.upcbroadband.com/wp/wp1-vxtoken-anp-g05060506-hzn-nl.t1.prd.dyncdn.dmdsdp.com/live/disk1/NL_000107_019441/_shared_05e8c13b39b3f30524c26012f903ed7f/NL_000107_019441.mpd",
                k1: "3e999e38253834baa63881ea451f2839",
                k2: "99b88d9cde1d8986decbc5985da87187"
            },
            "ESPN_NL_2": {
                url: "https://da-d436234420010b88000103020000000000000006.id.cdn.upcbroadband.com/wp/wp2-vxtoken-anp-g05060506-hzn-nl.t1.prd.dyncdn.dmdsdp.com/live/disk1/NL_000108_019561/_shared_05e8c13b39b3f30524c26012f903ed7f/NL_000108_019561.mpd",
                k1: "3e999e38253834baa63881ea451f2839",
                k2: "99b88d9cde1d8986decbc5985da87187"
            },
            "ESPN_NL_3": {
                url: "https://da-d436234320010b88000103020000000000000005.id.cdn.upcbroadband.com/wp/wp3-vxtoken-anp-g05060506-hzn-nl.t1.prd.dyncdn.dmdsdp.com/live/disk1/NL_000109_019464/_shared_05e8c13b39b3f30524c26012f903ed7f/NL_000109_019464.mpd",
                k1: "3e999e38253834baa63881ea451f2839",
                k2: "99b88d9cde1d8986decbc5985da87187"
            },
            "ESPN_NL_4": {
                url: "https://da-d436234b20010b8800010302000000000000000d.id.cdn.upcbroadband.com/wp/wp4-vxtoken-anp-g05060506-hzn-nl.t1.prd.dyncdn.dmdsdp.com/live/disk1/NL_000110_019562/_shared_05e8c13b39b3f30524c26012f903ed7f/NL_000110_019562.mpd",
                k1: "3e999e38253834baa63881ea451f2839",
                k2: "99b88d9cde1d8986decbc5985da87187"
            },
            "MOLA1": {
                url: "https://live.mocdn.tv/out/v1/678ab9a54d9844568af751dcaf418d97/manifest_L1.mpd",
                k1: "3e17c3798a294c49b93c1b2ddbcd8f29",
                k2: "0917fa8c9cf68c206efc24946d0c22cc"
            },
            "TSN2_CA": {
                url: "https://live-ctv.video.9c9media.com/f/TSN/TSN2/manifest.mpd",
                k1: "ddc52c88e2c24d38a5bc8dda8a2acb61",
                k2: "ad5ea485464a13eec7dda3249c556446"
            },
            "TSN3_CA": {
                url: "https://live-ctv.video.9c9media.com/f/TSN/TSN3/manifest.mpd",
                k1: "c0f378ad54e14a9c85a3d8c986d2a51f",
                k2: "5e1d040743ff78715e464ffb905e68a9"
            },
            "TSN4_CA": {
                url: "https://live-ctv.video.9c9media.com/f/TSN/TSN4/manifest.mpd",
                k1: "f0a2efd11e0643c3a45d6f67d02f1a97",
                k2: "85bf4469003bd28f01ea4fefedd5a431"
            },
            "TSN5_CA": {
                url: "https://live-ctv.video.9c9media.com/f/TSN/TSN5/manifest.mpd",
                k1: "cb57741a1cee422690c6294a06eb1320",
                k2: "7a0cfd493df6ef7cc0d0bb3ad95cec8c"
            },
            "DAZN_LA_LIGA": {
                url: "https://live.ll.ww.aiv-cdn.net/OTTB/dub-nitro/live/clients/dash/enc/wjgklbtvhh/out/v1/659736a1e24c40e4865a80ffd75e7de7/cenc.mpd",
                k1: "43d1c3b25207ff38b22ccfe17d302367",
                k2: "7b1f85f6e81059473b114c16a25c829a"
            },
            "EUROSPORTS_11": {
                url: "https://dcf-ak-livedazn.akamaized.net/dashrdm/dazn-linear-031/stream.mpd",
                k1: "82f8e2a17dac44c0a18f660479349c59",
                k2: "1b144f73e6fefe91cd05f850e2b589d0"
            },
            "EUROSPORTS_22": {
                url: "https://dcf-ak-livedazn.akamaized.net/dashrdm/dazn-linear-032/stream.mpd",
                k1: "82f8e2a17dac44c0a18f660479349c59",
                k2: "1b144f73e6fefe91cd05f850e2b589d0"
            },
            "LALIGA_HYPE": {
                url: "https://live.ll.ww.aiv-cdn.net/OTTB/dub-nitro/live/clients/dash/enc/woujvkfnmn/out/v1/141b52f08a1e4e97850219729ee48dc8/cenc.mpd",
                k1: "0b1fdeaee3ffc51e9a66cf1938d57aaf",
                k2: "28e3cb88ab7b476b81ab8aa0624c4d71"
            },
            "SKY_251_IT": {
                url: "https://linear311-it-dash1-prd.selector.skycdn.it/016a/31917/FHD/skysport251/master.mpd",
                k1: "00368000eaecbeeafd84c05b3b8243af",
                k2: "8f84185910e18ae0ca8a45004625a000"
            },
            "SKY_252_IT": {
                url: "https://linear311-it-dash1-prd-akg0.cdn13.skycdp.com/016a/32951/FHD/skysport252/master.mpd",
                k1: "0036c4797608fc64296d437bc6f8b790",
                k2: "1689af84b23f514005f9bb854da7667f" 
            },
            "SKY_253_IT": {
                url: "https://linear311-it-dash1-prd-akg0.cdn13.skycdp.com/016a/32233/FHD/skysport253/master.mpd",
                k1: "00365b169a077daac5081277c3fd0c28",
                k2: "f68ab32a552e13509a8ee1c4d96204bc"  
            },
            "SKY_254_IT": {
                url: "https://linear312-it-dash1-prd.selector.skycdn.it/016a/31234/FHD/skysport254/master.mpd",
                k1: "00369c14c20b78aadb1ec0e3c0e74979",
                k2: "e768767e2c7238d8069887bb36aed7fa" 
            },
            "SKY_255_IT": {
                url: "https://linear311-it-dash1-prd-ll.cdn13.skycdp.com/016a/32910/FHD/skysport255/master.mpd",
                k1: "0036b781a22ebb0c20c16ac27d5d1448",
                k2: "f309b94acfda720bf1ed5741489f8967"  
            },
            "SKY_256_IT": {
                url: "https://linear312-it-dash1-prd-akg0.cdn13.skycdp.com/016a/31912/FHD/skysport256/master.mpd",
                k1: "00366f263859fc1cc82d2c4da6a66ef6",
                k2: "754ae922d113c54349002cd9a88694a4"   
            },
            "SKY_257_IT": {
                url: "https://linear311-it-dash1-prd.selector.skycdn.it/016a/31775/FHD/skysport257/master.mpd",
                k1: "0036faeace9872d3ceeb8b1b63f0baa3",
                k2: "dbd41ee944243307d39b7b27f16615a8"     
            },    
            "SKY_258_IT": {
                url: "https://linear312-it-dash1-prd-ll.cdn13.skycdp.com/016a/32772/skysport258/master.mpd",
                k1: "0036fd8ccfddba47c8b40aeff63a797c",
                k2: "dfd5c9d0f4ac6f3a1bd89803399e7026"
            },
            "SKY_Arena_IT": {
                url: "https://linear304-it-dash1-prd-ll.cdn13.skycdp.com/016a/31024/FHD/skysportarena/master.mpd",
                k1: "00364ee1c777f44a74e4df12f3095503",
                k2: "77dee68a39366663755beb8fa62dcc1e"
            },
            "ASIAN_CUP": {
                url: "https://mwmpos03.akamaized.net/out/v1/64a59477c5d34afba754e763bb12ac81/manifest.mpd",
                k1: "d31e0ee60e034e228e7f219650c0d6e2",
                k2: "c50c247d5a34c1fbd565ad31886287cb"
            },"DAZN_LA_LIGA_OP2": {
                url: "https://live.ll.ww.aiv-cdn.net/OTTB/dub-nitro/live/clients/dash/enc/wjgklbtvhh/out/v1/659736a1e24c40e4865a80ffd75e7de7/cenc.mpd",
                k1: "43d1c3b25207ff38b22ccfe17d302367",
                k2: "7b1f85f6e81059473b114c16a25c829a"
            },
            "SKY_SPORTS_UNO_IT": {
                url: "https://linear301-it-dash1-prd-akg0.cdn13.skycdp.com/016a/31023/FHD/skysportuno/master_stereo.mpd",
                k1: "00362452ed102000ccea64c311921dc2",
                k2: "02f27bd6caab7633d3083b94d3958b1c"
            },
            "SKY_PREMIER_LEAGUE": {
                url: "https://andi-cors-proxy-service-k8s.andisearch.com/https://linear015-gb-dash1-prd-ll.cdn.skycdp.com/016a/Content/DASH_003_720_120/Live/channel(skysportspremierleague)/manifest_720.mpd",
                k1: "00058832b1c058c3de8b5d118cc775d4",
                k2: "721345f25729d236d6bb317fce797b77"
            },
            "SKY_SPORTS_MAIN_EVENT": {
                url: "https://linear018-gb-dash1-prd-ak.cdn.skycdp.com/016a/Content/DASH_003_720_120/Live/channel(skysportsmainevent)/manifest_720.mpd",
                k1: "000546476256963bd054ded3b6ae5800",
                k2: "1e497068bcc078fdb2f4296bc400ca2b"
            },
            "RTL_DE": {
                url: "https://pnowlive-a.akamaized.net/live/rtlhd/dash/rtlhd.mpd",
                k1: "57e48b99f3f6d4f13f5c5afdcca084ca",
                k2: "29379a5e2d3405fad2f5d9cbe92586c3"
            },
            "SKY_SPORTS_FOOTBALL": {
                url: "https://linear019-gb-dash1-prd-ak.cdn.skycdp.com/016a/Content/DASH_003_720_120/Live/channel(skysportsfootball)/manifest_720-120.mpd",
                k1: "00051940357f91714b419a79af5a5f9a",
                k2: "f4e7d0c43db524393ba85fd240d9cd6e"
            },
            "SKY_SPORTS_F1": {
                url: "https://linear034-gb-dash1-prd-ll.cdn.skycdp.com/016a/Content/DASH_003_720_30/Live/channel(skysportsf1)/manifest_720.mpd",
                k1: "0005b57b9b4712e29641ac981ba8d3c2",
                k2: "ca13cdd1b96bf1877d2c7ad9ee37d52e"
            },
            "BEIN1_TH": {
                url: "https://ais-s.ais-vidnt.com/ais/play/origin/live/eds/S0001/DASH/S0001.mpd",
                k1: "3fd52d1e9ba4b180aec12c9295b62c0f",
                k2: "bb274e33da0c709e62c55d0cba911889"
            },
            "SKY_PREMIER_LG": {
                url: "https://linear003-gb-dash1-prd-ll.cdn.skycdp.com/016a/Content/DASH_003_sd/Live/channel(skysportspremierleague)/manifest_sd.mpd",
                k1: "0003e5d66d7501ff2930c80e9b5609fc",
                k2: "32661be41b5b713dcd88683cd389af21"
            },
            "USA_NETWORK": {
                url: "https://fsly.stream.peacocktv.com/Content/CMAF_OL1-CTR-4s/Live/channel(usa-east)/master.mpd",
                k1: "882c9f5613b43b47adc70aa968a308ce",
                k2: "de534ef8914bfe62ba3cdd6bdb9e1c04"
            },
            "ZIGGO_SPORT": {
                url: "https://da-d436236920010b8800010303000000000000000b.id.cdn.upcbroadband.com/wp/wp7-vxtoken-anp-g05060506-hzn-nl.t1.prd.dyncdn.dmdsdp.com/live/disk1/NL_000014_019661/_shared_6a89db18ec4202bae4d424e84c1f46a2/NL_000014_019661.mpd",
                k1: "0be3d503dba13fc9a9c8ad4b89f599e6",
                k2: "578c2231c526c5e9eb415411e36871bf"
            },
            "ZIGGO_SELECT": {
                url: "https://da-d436236720010b88000103030000000000000009.id.cdn.upcbroadband.com/wp/wp1-anp-g05060506-hzn-nl.t1.prd.dyncdn.dmdsdp.com/live/disk1/NL_000094_019321/_shared_cc010062b17300c4504b6ab5681b5417/NL_000094_019321.mpd",
                k1: "16bf72dc22743d929c4318e193408373",
                k2: "eae51a1e3904124963074cbf432c7c8e"
            }, "ZIGGO_VOETBAL": {
                url: "https://da-d436234620010b88000103020000000000000008.id.cdn.upcbroadband.com/wp/wp2-anp-g05060506-hzn-nl.t1.prd.dyncdn.dmdsdp.com/live/disk1/NL_000095_019371/_shared_cc010062b17300c4504b6ab5681b5417/NL_000095_019371.mpd",
                k1: "16bf72dc22743d929c4318e193408373",
                k2: "eae51a1e3904124963074cbf432c7c8e"
            },
            "ZIGGO_DOCU": {
                url: "https://da-d436234820010b8800010302000000000000000a.id.cdn.upcbroadband.com/wp/wp5-vxtoken-anp-g05060506-hzn-nl.t1.prd.dyncdn.dmdsdp.com/live/disk1/NL_000098_019255/_shared_cc010062b17300c4504b6ab5681b5417/NL_000098_019255.mpd",
                k1: "16bf72dc22743d929c4318e193408373",
                k2: "eae51a1e3904124963074cbf432c7c8e"
            },
            "PREMIER_SPORTS_1_IRL": {
                url: "https://linear001-ie-dash1-prd-ak.cdn.skycdp.com/016a/Content/DASH_003_720_120/Live/channel(premiersports1)/manifest_720.mpd",
                k1: "0005b3dba78ae0fe7a9288022d3b3736",
                k2: "d2827df80dd7e9243ba6b5bbda5dfa82"
            },
            "ESPN_DEPORTES_USA_VPN": {
                url: "https://linear.stvacdn.spectrum.com/LIVE/1166/dash/cenc/ESPNDHD_13667/manifest.mpd",
                k1: "be65e5985fa04a49af310f0a92a0260a",
                k2: "1acb5ff7b0dbfdf19c4dca1aabfaaa11"
            },
            "OPTA": {
                url: "https://linear.aws.optusvideo.tv/v7/OptusSport2/xbtss/drm/avc/dash/plain/manifest.mpd",
                k1: "127b26420b5343719a317dc6abc3099e",
                k2: "a859aa07a1a3a75eb6525195ca441488"
            },
            "GLOBOBR_RJ": {
                url: "https://0006-bbc.dtvott.com/dash_live_0094/manifest.mpd",
                k1: "fe1d448746445b0dad008ffc96659be1",
                k2: "2ea732e3e3c1e4c944973ce9ea924292"
            },


            "BBC1_ENG": {
                url: "https://nlziet-live.akamaized.net/L10/83066be1/2964e0b7.isml/.mpd",
                k1: "079d3f2f69a749e0957478d9068369c6",
                k2: "6b4a90d3e4d237aa97cad444cb977c0a"
            },
            "SPORTSNETWORLD_CA": {
                url: "https://live-streaming-rsm.azureedge.net/snwlh/snwlh_cenc.isml/.mpd",
                k1: "44f6a1e5467d4df7a9da2d1b96ee62ca",
                k2: "157d3d7156dd1b288d661d453dbfc682"
            },
            "ELEVEN_SPORTS_1_PT": {
                url: "https://da-d50d12b5.online.meo.pt/wp/cdn-er-vspp-cvl2.online.meo.pt/shls/LIVE$Eleven_Sports_1_HD/index.m3u8/S!d2EJVFZPU19MaXZlEgJU.v...wEWBJ8_/Level(5242880)",
            },
            "ELEVEN_SPORTS_2_PT": {
                url: "https://da-d50d12b5.online.meo.pt/wp/cdn-er-vspp-cvl2.online.meo.pt/shls/LIVE$Eleven_Sports_2_HD/index.m3u8/S!d2EISU9TX0xpdmUSBkPIS1XDVP7...8BFgyf/Level(1200000)",
            },
            "ELEVEN_SPORTS_3_PT": {
                url: "https://da-d50d12b5.online.meo.pt/wp/cdn-er-vspp-cvl2.online.meo.pt/shls/LIVE$Eleven_Sports_3_HD/index.m3u8/S!d2EISU9TX0xpdmUSBkPIS1XDVP7...8BFgyf/Level(1200000)",
            },
            "ELEVEN_SPORTS_4_PT": {
                url: "https://da-d50d12b5.online.meo.pt/wp/cdn-er-vspp-cvl2.online.meo.pt/shls/LIVE$Eleven_Sports_4_HD/index.m3u8/S!d2EISU9TX0xpdmUSBkPIS1XDVP7...8BFgyf/Level(1200000)",
            },
            "ELEVEN_SPORTS_5_PT": {
                url: "https://dcf-ak-livedazn.akamaized.net/dashrdm/dazn-linear-058/stream.mpd",
                k1: "82f8e2a17dac44c0a18f660479349c59",
                k2: "1b144f73e6fefe91cd05f850e2b589d0"
            },
            "ELEVEN_SPORTS_6_PT": {
                url: "https://dcf-ak-livedazn.akamaized.net/dashrdm/dazn-linear-059/stream.mpd",
                k1: "82f8e2a17dac44c0a18f660479349c59",
                k2: "1b144f73e6fefe91cd05f850e2b589d0"
            },
            "PLAY_SPORTS_2_BE": {
                url: "https://dca-ak-livedazn.akamaized.net/dash/dazn-linear-023/stream.mpd",
                k1: "82f8e2a17dac44c0a18f660479349c59",
                k2: "1b144f73e6fefe91cd05f850e2b589d0"
            },
            "PLAY_SPORTS_1_BE": {
                url: "https://dcf-ak-livedazn.akamaized.net/dashrdm/dazn-linear-051/stream.mpd",
                k1: "82f8e2a17dac44c0a18f660479349c59",
                k2: "1b144f73e6fefe91cd05f850e2b589d0"
            },
            "ELEVEN_PRO_LEAGUE1": {
                url: "https://dcf-ak-livedazn.akamaized.net/dashrdm/dazn-linear-049/stream.mpd",
                k1: "82f8e2a17dac44c0a18f660479349c59",
                k2: "1b144f73e6fefe91cd05f850e2b589d0"
            },
            "DAZN_1_DE": {
                url: "https://live.ll.ww.aiv-cdn.net/OTTB/dub-nitro/live/clients/dash/enc/bmnelo5c7a/out/v1/3ce2cdc4589f46189322bd3717c77957/cenc.mpd",
                k1: "44dd9cd370b08a868ead115fe84ecfde",
                k2: "bff19ab0a51cf14e848389b152913fd0"
            },
            "DAZN_2_DE": {
                url: "https://dcf-ak-livedazn.akamaized.net/dashrdm/dazn-linear-018/stream.mpd",
                k1: "82f8e2a17dac44c0a18f660479349c59",
                k2: "1b144f73e6fefe91cd05f850e2b589d0"
            },
            "DAZN_1_ES": {
                url: "https://ottb.live.cf.ww.aiv-cdn.net/dub-nitro/live/clients/dash/enc/bmnelo5c7a/out/v1/3ce2cdc4589f46189322bd3717c77957/cenc.mpd",
                k1: "44dd9cd370b08a868ead115fe84ecfde",
                k2: "bff19ab0a51cf14e848389b152913fd0"
            },
            "DAZN_2_ES": {
                url: "https://ottb.live.cf.ww.aiv-cdn.net/dub-nitro/live/clients/dash/enc/xnk4m9bnxt/out/v1/4ced7b7329a54652b9bb0521ed38bd4d/cenc.mpd",
                k1: "0eab5a3f3e3b4ba5d42d40ca30d17571",
                k2: "f3f061ded9b70e8160590d5802ecda6d"
            },

           "DAZN_3_ES": {
                url: "https://live.ll.ww.aiv-cdn.net/OTTB/dub-nitro/live/clients/dash/enc/zy1ee5sshp/out/v1/bdcffa69fa3b4f3bb3569c9c73ee1c01/cenc.mpd",
                k1: "bad8efff688c0dbb3711e4a7114c22a3",
                k2: "6ba800673b20776c0c850130d45e1920"
            },

           "DAZN_4_ES": {
                url: "https://live.ll.ww.aiv-cdn.net/OTTB/dub-nitro/live/clients/dash/enc/up7qpwch9b/out/v1/a6d5d1a1287b4893b859c2d6ccf2c65d/cenc.mpd",
                k1: "d27104d427e4f87e75b19395a9f8796b",
                k2: "723593c70e2d4c4862754398e80168f8"
            },
            "SPORTDIGITALDE": {
                url: "https://dcf-fs-live-dazn-cdn.dazn.com/dashdrm/dazn-linear-022/stream.mpd",
                k1: "82f8e2a17dac44c0a18f660479349c59",
                k2: "1b144f73e6fefe91cd05f850e2b589d0"
            },
            "ZONA_DAZN_ITALIA": {
                url: "https://dcf-ak-livedazn.akamaized.net/dashrdm/dazn-linear-024/stream.mpd",
                k1: "82f8e2a17dac44c0a18f660479349c59",
                k2: "1b144f73e6fefe91cd05f850e2b589d0"
            },
            "TUDN_USA_VPN": {
                url: "https://linear.stvacdn.spectrum.com/LIVE/1131/dash/cenc/TUDNUH_8283/manifest.mpd",
                k1: "85c8956b207c44a693d89984803c908b",
                k2: "8d8ff21c464506ef396356dd761f5ccd"
            },
            "PREMIER_SPORTS_2_IRL": {
                url: "https://linear031-ie-dash1-prd-ak.cdn.skycdp.com/016a/Content/DASH_003_720_120/Live/channel(premiersports2)/manifest_720.mpd",
                k1: "0005d61a0ac86aca28176591b21ae2d9",
                k2: "f87ad1430a7a38fd0ac248fc9a8389b1"
            },
            "ARENA_SPORTSP_1_BH": {
                url: "https://webtvstream.bhtelecom.ba/hls6/as_premium1.mpd",
                k1: "c18b6aa739be4c0b774605fcfb5d6b68",
                k2: "e41c3a6f7532b2e3a828d9580124c89d"
            },
            "ARENA_SPORTSP_2_BH": {
                url: "https://webtvstream.bhtelecom.ba/hls6/as_premium2.mpd",
                k1: "c18b6aa739be4c0b774605fcfb5d6b68",
                k2: "e41c3a6f7532b2e3a828d9580124c89d"
            },
            "ARENA_SPORTSP_3_BH": {
                url: "https://webtvstream.bhtelecom.ba/hls6/as_premium3.mpd",
                k1: "c18b6aa739be4c0b774605fcfb5d6b68",
                k2: "e41c3a6f7532b2e3a828d9580124c89d"
            },
            "ARENA_SPORTS_1_BH": {
                url: "https://webtvstream.bhtelecom.ba/hls6/arena1.mpd",
                k1: "c18b6aa739be4c0b774605fcfb5d6b68",
                k2: "e41c3a6f7532b2e3a828d9580124c89d"
            },
            "ARENA_SPORTS_2_BH": {
                url: "https://webtvstream.bhtelecom.ba/hls6/arena2.mpd",
                k1: "c18b6aa739be4c0b774605fcfb5d6b68",
                k2: "e41c3a6f7532b2e3a828d9580124c89d"
            },
            "ARENA_SPORTS_3_BH": {
                url: "https://webtvstream.bhtelecom.ba/hls6/arena3.mpd",
                k1: "c18b6aa739be4c0b774605fcfb5d6b68",
                k2: "e41c3a6f7532b2e3a828d9580124c89d"
            },
            "ARENA_SPORTS_4_BH": {
                url: "https://webtvstream.bhtelecom.ba/hls6/arena4.mpd",
                k1: "c18b6aa739be4c0b774605fcfb5d6b68",
                k2: "e41c3a6f7532b2e3a828d9580124c89d"
            },
            "ARENA_SPORTS_5_BH": {
                url: "https://webtvstream.bhtelecom.ba/hls6/arena5.mpd",
                k1: "c18b6aa739be4c0b774605fcfb5d6b68",
                k2: "e41c3a6f7532b2e3a828d9580124c89d"
            },
            "ARENA_SPORTS_6_BH": {
                url: "https://webtvstream.bhtelecom.ba/hls6/arena6.mpd",
                k1: "c18b6aa739be4c0b774605fcfb5d6b68",
                k2: "e41c3a6f7532b2e3a828d9580124c89d"
            },
            "premiere5br": {
                url: "https://live.ll.ww.aiv-cdn.net/OTTB/iad-nitro/live/clients/dash/enc/j4y12ucrx0/out/v1/9135597c4400465e9e752dc32de587fd/cenc.mpd",
                k1: "d5a3ac0b892bfccdf352b6def9cb2764",
                k2: "ac0936acc0036fad2273efaa42b1fafd"
            },
            "premiere6br": {
                url: "https://ottb.live.cf.ww.aiv-cdn.net/iad-nitro/live/clients/dash/enc/cydwktwhqj/out/v1/c6e2919fe4e04a73935691f8284a4afe/cenc.mpd",
                k1: "05cedc366ce4ec735ee4b33fcefbf01f",
                k2: "475d6dd40eaba6896e02b26a6cf34d95"
            },

           "TV4_SE": {
                url: "https://director.streaming.telia.com/tvm-packager-prod/group2/61a4859b79019af4abf1009d/manifest.mpd?adap=default",
                k1: "b09d157d18ab51b9923a3d5abdeefd52",
                k2: "5a29bb3c705edea6941a5b1d575ac316"
            },
             "PLAY6_BE": {
                url: "https://aguabonex.onrender.com/https://stream2-linear.cdn1.sbs.prd.telenet-ops.be/ch/play6/dash.mpd",
                k1: "51895962ba4a553bb04a5aaf219b4df5",
                k2: "965b14b0d29d7edddf5a71438ccb686d"
            },
             "TIPIK_BE": {
                url: "https://c9851ec-rbm-hilv-fsly.cdn.redbee.live/L26/6b640fa2/13eebe8d.isml/dash/.mpd",
                k1: "2f794d3c19854f4fa6f0183b993b86fa",
                k2: "37077d010758ce2cb85ca46720884b01"
            },
            "SPORT_TV_1PT": {
                url: "https://da-d50d12b5.online.meo.pt/wp/cdn-er-vspp-cvl2.online.meo.pt/shls/LIVE$SPORTTV1_HD/index.m3u8/S!d2EISU9TX0xpdmUSBkPIS1XDVP7...8BFgyf/Level(3000000)",
            },
            "SPORT_TV_2PT": {
                url: "https://da-d50d12b5.online.meo.pt/wp/cdn-er-vspp-cvl2.online.meo.pt/shls/LIVE$SPORTTV2_HD/index.m3u8/S!d2EISU9TX0xpdmUSBkPIS1XDVP7...8BFgyf/Level(3000000)",
            },
            "SPORT_TV_3PT": {
                url: "https://da-d50d12b5.online.meo.pt/wp/cdn-er-vspp-cvl2.online.meo.pt/shls/LIVE$SPORTTV3_HD/index.m3u8/S!d2EISU9TX0xpdmUSBkPIS1XDVP7...8BFgyf/Level(3000000)",
            },
            "SPORT_TV_4PT": {
                url: "https://da-d50d12b5.online.meo.pt/wp/cdn-er-vspp-cvl2.online.meo.pt/shls/LIVE$SPORTTVLive_HD/index.m3u8/S!d2EISU9TX0xpdmUSBkPIS1XDVP7...8BFgyf/Level(3000000)",
            },
            "SPORT_TV_5PT": {
                url: "https://da-d50d12b5.online.meo.pt/wp/cdn-er-vspp-cvl2.online.meo.pt/shls/LIVE$SPORTTV_GOLFE_HD/index.m3u8/S!d2EISU9TX0xpdmUSBkPIS1XDVP7...8BFgyf/Level(3000000)",
            },
            "SPORT_TV_6PT": {
                url: "https://da-d50d12b5.online.meo.pt/wp/cdn-er-vspp-cvl2.online.meo.pt/shls/LIVE$SPORTTV6_HD/index.m3u8/S!d2EJVFZPU19MaXZlEgJU.v...wEWBJ8_/Level(5242880)",
            },
            "CANAL_11": {
                url: "https://da-d50d12b5.online.meo.pt/wp/cdn-er-vspp-cvl2.online.meo.pt/shls/LIVE$C11_HD/index.m3u8/S!d2EISU9TX0xpdmUSBkPIS1XDVP7...8BFgyf/Level(3000000)",
            },
            "SKY_SPORTS_MAX_IT": {
                url: "https://linear305-it-dash1-prd-ll.cdn13.skycdp.com/016a/31248/FHD/skysportmax/master.mpd",
                k1: "0036a901e6f0381cfd1b6fcf10cc6038",
                k2: "4fbb022704c9abcbb709484a5667fd79"
            },
            "TV_LA_1_ES": {
                url: "https://cache3.zapitv.com/live/eds_c2/la1_4k/dash_live_enc/la1_4k.mpd",
                k1: "a3abc44525eef3b0a7af9138a9dbe34a",
                k2: "7740f8ae4223ce5ba293028f7f78f1c1"
            },
            "TVMAX": {
                url: "https://bcovlive-a.akamaihd.net/74f665e9ff8447639d4de4b8b458d8ae/us-east-1/6058004209001/playlist_dvr.m3u8"
            },
            "TRUE_PREMIER_1_IN": {
                url: "https://edge2.laotv.la/live/TSport1/index.m3u8"
            },
            "TRUE_PREMIER_2_IN": {
                url: "https://edge2.laotv.la/live/TSport2/index.m3u8"
            },
            "SONY_SPORTS_1": {
                url: "https://cdn-tv.co.in/myweb/watch.php?id=1000009276&e=.m3u8"
            },
            "SONY_SPORTS_2": {
                url: "https://cdn-tv.co.in/myweb/watch.php?id=1000009277&e=.m3u8"
            },
            "SONY_SPORTS_3": {
                url: "https://cdn-tv.co.in/myweb/watch.php?id=1000009278&e=.m3u8"
            },
            "SONY_SPORTS_4": {
                url: "https://cdn-tv.co.in/myweb/watch.php?id=1000119187&e=.m3u8"
            },
            "SONY_SPORTS_5": {
                url: "https://cdn-tv.co.in/myweb/watch.php?id=1000009275&e=.m3u8"
            },
            "BEIN_XTRA_N_ES": {
                url: "https://d35j504z0x2vu2.cloudfront.net/v1/master/0bc8e8376bd8417a1b6761138aa41c26c7309312/bein-sports-xtra-en-espanol/playlist.m3u8"
            },
            "BEIN_SPORTS_1_TH": {
                url: "https://49-231-37-237-rewriter.ais-vidnt.com/ais/play/origin/live/eds/S0001/DASH/S0001.mpd",
                k1: "3fd52d1e9ba4b180aec12c9295b62c0f",
                k2: "bb274e33da0c709e62c55d0cba911889"
            },
            "BEIN_SPORTS_2_TH": {
                url: "https://49-231-37-237-rewriter.ais-vidnt.com/ais/play/origin/live/eds/S0002/DASH/S0002.mpd",
                k1: "30c11587a1686b72f115f34b0bf1c383",
                k2: "1e3a6af2408cdd78347b722728560c3b"
            },
            "BEIN_SPORTS_3_TH": {
                url: "https://49-231-37-237-rewriter.ais-vidnt.com/ais/play/origin/live/eds/S0003/DASH/S0003.mpd",
                k1: "aa724943787320593f5563048c90032d",
                k2: "a039276254f53769b040199a4eca8c2c"
            },
            "BEIN_SPORTS_4_TH": {
                url: "https://49-231-37-237-rewriter.ais-vidnt.com/ais/play/origin/live/eds/S0004/DASH/S0004.mpd",
                k1: "cb419fa5f5498e2c6cbc39363248ddd7",
                k2: "b5853b51f2060025a822e62973154556"
            },
            "BEIN_SPORTS_6_TH": {
                url: "https://49-231-37-237-rewriter.ais-vidnt.com/ais/play/origin/live/eds/S0006/DASH/S0006.mpd",
                k1: "ceac4607562049abb9d1b0309d9cd6f3",
                k2: "d396d277a364fab00d0193d25b700847"  
            },
            "BEIN_SPORTS_7_TH": {
                url: "https://49-231-37-237-rewriter.ais-vidnt.com/ais/play/origin/live/eds/S0007/DASH/S0007.mpd",
                k1: "94a28a75b3891e92a97efbe76f941095",
                k2: "7b39cd0e318ee481b98c36a125c540fb"
            },
            "MLB_TV": {
                url: "https://dcf-ak-livedazn.akamaized.net/dashrdm/dazn-linear-026/stream.mpd",
                k1: "82f8e2a17dac44c0a18f660479349c59",
                k2: "1b144f73e6fefe91cd05f850e2b589d0"
            },
            "TNT_1_GB": {
                url: "https://ottb.live.cf.ww.aiv-cdn.net/lhr-nitro/live/clients/dash/enc/wf8usag51e/out/v1/bd3b0c314fff4bb1ab4693358f3cd2d3/cenc.mpd",
                k1: "ae26845bd33038a9c0774a0981007294",
                k2: "63ac662dde310cfb4cc6f9b43b34196d"
            },
            "TNT_2_GB": {
                url: "https://linear014-ie-dash1-prd-ak.cdn.skycdp.com/016a/Content/DASH_003_720_120/Live/channel(tntsport2)/manifest_720.mpd",
                k1: "00050654545edbcf400de7c11a3ace78",
                k2: "7fc6cab788206f4b2c10fe5225def411"
            },
            "TNT_3_GB": {
                url: "https://linear001-ie-dash1-prd-ak.cdn.skycdp.com/016a/Content/DASH_003_720_120/Live/channel(tntsport3)/manifest_720.mpd",
                k1: "000540adbb30871d80550825b28bc4c3",
                k2: "402edc50e9288aadc551bceaf347a517"
            },
            "TNT_4_GB": {
                url: "https://linear014-ie-dash1-prd-ak.cdn.skycdp.com/016a/Content/DASH_003_720_120/Live/channel(tntsport4)/manifest_720.mpd",
                k1: "0005091188d73981c2bbd51bbe4a81ab",
                k2: "2ee68af747c05c250b6a1c80abe57d2d"
            },
            "TV2_Sport_1_NO": {
                url: "https://live-aws-scalstrm-cdn.rikstv.no/live/rikstv/64393bf81dbc891fd41f53ac/manifest.mpd",
                k1: "0c6212056d2f51fcbf569f9a1a8517d1",
                k2: "d07b404deb7c958347d742e6d1d2f3f9"

            },
            "Sky_Sports_Calcio_IT": {
                url: "https://linear302-it-dash1-prd-ll.cdn13.skycdp.com/016a/31209/FHD/skysportseriea/master.mpd",
                k1: "0036e5d0e88dfb087f1791da6150ced9",
                k2: "0bc653d830837dceb13bd17169f0f8e2"
            },
            "SBT_BR": {
                url: "https://0006-bbc.dtvott.com/dash_live_0035/manifest.mpd",
                k1: "3ad3dca103185934acff7a0e9000c112",
                k2: "3f396659d841a55cd1381e6735ecfa1d"
            },
             "CLUB_1_BE": {
                url: "https://origin2-rtlbe.live.6cloud.fr/pool_z6h2o6qd/clubrtl/rtlbesd/dash_short_cenc10_clubrtl/index.mpd",
                k1: "b53316f32fc93b51a61ba6fdf0bce6c1",
                k2: "d752d66843a48a6fed64eed8f87adc3e"
            },
            "CANALE_5_IT": {
                url: "https://live03p-seg.msf.cdn.mediaset.net/live/ch-c5/c5-dash-widevine.isml/manifest.mpd",
                k1: "00f9f3c0783536b8ce4a30a01a52e082",
                k2: "e926f7d45af4f7d154c990eae6a2d937"
            },
            "PLAY_SPORTS1BE": {
                url: "https://dcf-ak-livedazn.akamaized.net/dashrdm/dazn-linear-051/stream.mpd",
                k1: "82f8e2a17dac44c0a18f660479349c59",
                k2: "1b144f73e6fefe91cd05f850e2b589d0"
            },
            "PLAY_SPORTS2BE": {
                url: "https://dcf-ak-livedazn.akamaized.net/dashrdm/dazn-linear-052/stream.mpd",
                k1: "82f8e2a17dac44c0a18f660479349c59",
                k2: "1b144f73e6fefe91cd05f850e2b589d0"
            },
            "PLAY_SPORTS3BE": {
                url: "https://dcf-ak-livedazn.akamaized.net/dashrdm/dazn-linear-053/stream.mpd",
                k1: "82f8e2a17dac44c0a18f660479349c59",
                k2: "1b144f73e6fefe91cd05f850e2b589d0"
            },          
            "ITV1_GB": {
                url: "https://wp2-obc1112-live-ch-prod.prod.cdn.dmdsdp.com/dash/SV09212/manifest.mpd",
                k1: "5d9937d586414096948337ac314d79c1",
                k2: "22ca2e250b729982c97209e0ff3f7e9b"
            },   
            "FOX_DEPORTES_USA": {
                url: "https://cors-proxy-s47hjsqcra-uc.a.run.app/https://cip4-2048b75120.linear-novi.stvacdn.spectrum.com/LIVE/5239/bpk-tv/00700/drm/manifest.mpd",
                k1: "ff18f095bc835e8d902be9420438729e",
                k2: "bbfdc8de223e8b33144d5c718f01f58b"
            },
            "BandSports_BR": {
                url: "https://0055-jbc.dtvott.com/dash_live_0054/manifest.mpd?da=1&country=BR&accountType=DTH&deviceType=web",
                k1: "bd1af42db82f5a17a0d75246f25f5201",
                k2: "a9edd4e2c410923e9cbcb261102e5008"
            },
            "TV2_Sport_NO": {
                url: "https://ch11-hls-live.akamaized.net/out/u/433127.mpd",
                k1: "d12e4c9dc52f4cbab7ac9b2278317e47",
                k2: "a7987e5b6ec42db68a25486e108ca9f2"
            },
            "EUROSPORTS_1": {
                url: "https://da-d50d12b5.online.meo.pt/wp/cdn-er-vspp-cvl2.online.meo.pt/shls/LIVE$Eurosport_HD/index.m3u8/S!d2EISU9TX0xpdmUSBkPIS1XDVP7...8BFgyf/Level(1200000)",
            },
            "EUROSPORTS_2": {
                url: "https://da-d50d12b5.online.meo.pt/wp/cdn-er-vspp-cvl2.online.meo.pt/shls/LIVE$Eurosport_2_HD/index.m3u8/S!d2EISU9TX0xpdmUSBkPIS1XDVP7...8BFgyf/Level(2100000)",
            },
            "ITALIA_1": {
                url: "https://live03p-seg.msf.cdn.mediaset.net/live/ch-i1/i1-dash-widevine.isml/manifest.mpd",
                k1: "00f9f3c0783536b8ee91704e23b78016",
                k2: "bfd04d6f544c9cc4d35cb13ab6778587"
            },
            "Sky_Sport_253": {
                url: "https://linear311-it-dash1-prd-akg0.cdn13.skycdp.com/016a/32233/FHD/skysport253/master.mpd",
                k1: "00365b169a077daac5081277c3fd0c28",
                k2: "f68ab32a552e13509a8ee1c4d96204bc"
            },
            "CANAL_5": {
                url: "https://channel05.akamaized.net/hls/live/2033783/event01/index.m3u8",
            },
            "SPORT_PLUS_DE": {
                url: "https://ac-009.live.p7s1video.net/c5c609cf/t_009/sport1plus-de-hd/cenc-default.mpd",
                k1: "c1c11c3844b0dffdb9d9831900f1a1da",
                k2: "a2c31e15346f339ca2b47bdd8591553f"
            },
            "TV2_Direkte_NO": {
                url: "https://aws-appeartv-cdn.rikstv.no/rikstv/1/11/dash/TV2_HD/manifest.mpd?version=1&adap=no_dolby&RikstvAssetId=rikstv_5711",
                k1: "bfb0134de69d76d25b5b4b202df11431",
                k2: "025915bd3062c4bde44a13916c5bfefe"
            },
            "HRT_2": {
                url: "https://cdn1oiv.akamaized.net/hrtliveorigin/hrt2.smil/1/manifest.mpd",
                k1: "994c79af863838109e7f3503bcd2aff9",
                k2: "d2c19650ad2a2ac77a95453b941a6f0e"
            },
            "INFINITY_PLUS_1": {
                url: "https://live03p-seg.msf.cdn.mediaset.net/live/ch-u1/u1-dash-widevine.isml/manifest.mpd",
                k1: "00f9f3c0783536b832a8f0326fbdc02e",
                k2: "ade0533ba667bb7e9847d8f215f03076"
            },
            "INFINITY_PLUS": {
                url: "https://live03p-seg.msf.cdn.mediaset.net/live/ch-u2/u2-dash-widevine.isml/manifest.mpd",
                k1: "00f9f3c0783536b834b0f0c2bfee80ac",
                k2: "76b3afbf163f9c3feb6204b8fcf0ff53"
            },
            "FORMULA_1": {
                url: "https://live.ll.ww.aiv-cdn.net/OTTB/dub-nitro/live/clients/dash/enc/cqbcvgkb83/out/v1/4dbe05ecfb1540448d82d68eeebfbb1c/cenc.mpd",
                k1: "1061be12d303247426ec25e8369b2647",
                k2: "bd622b0e610295de3b0bccb850ccaaaa"
            },
            "TYC_SPORTS_PLAY": {
                url: "https://d3v9hc3dccxi3a.cloudfront.net/out/v1/bccdd4d97f434c63ab2f675e5145758f/index.m3u8",
            },
            "TYC_SPORTS_PLAY_V2": {
                url: "https://dbjn2fo8vpiph.cloudfront.net/out/v1/4c8dc641a91448439388e41118924965/index.m3u8",
            },
            "TYC_SPORTS_PLAY_V3": {
                url: "https://d107yb993altze.cloudfront.net/out/v1/772e0b0193134726ad84693b7baca6c6/index.m3u8",
            },
            "TYC_SPORTS_PLAY_V4": {
                url: "https://d21no6qan3ol31.cloudfront.net/out/v1/a2f25f61e9d44701aa4e813ac5efc4a4/index.m3u8",
            },
             "TYC_SPORTS_PLAY_V5": {
                url: "https://d107yb993altze.cloudfront.net/out/v1/772e0b0193134726ad84693b7baca6c6/index.m3u8",
            },
             "TYC_SPORTS_PLAY_V6": {
                url: "https://d2scohpz55y5r5.cloudfront.net/out/v1/c43ac17254584daa9781eaaeea1a085d/index.m3u8",
            },
             "TYC_SPORTS_PLAY_V7": {
                url: "https://d2epjg24mgndbw.cloudfront.net/out/v1/1bcd1ee954894463b1793597891a25b6/index.m3u8",
            },
             "TYC_SPORTS_PLAY_V8": {
                url: "https://d1scuk1wvkchtc.cloudfront.net/out/v1/19321d887c274b58a4f62fe0f6e2151b/index.m3u8",
             },
            "TELE_DEPORTE": {
                url: "https://spa-ha-p004.cdn.masmediatv.es/SVoriginOperatorEdge/smil:4_HD.smil/manifest.m3u8",
            },
            "TELEMUNDO_USA": {
                url: "https://content.uplynk.com/channel/b6a96ed39d694ae1b738faa98cf7dd3f.m3u8",
            },
            "PREMIERE_BR": {
                url: "https://0064-jbc.dtvott.com/dash_live_0079/manifest.mpd",
                k1: "50653a20839a57c8b2d3cde6ddc46cdb",
                k2: "8a505419dccb50ee07ecebf5a6b44c63"
            },
            "ABUDHABISP_1": {
                url: "https://uselector.cdn.intigral-ott.net/ADSP1/ADSP1.isml/manifest.mpd",
                k1: "eb5a3a48f3e191a00e3ac1e2d470c491",
                k2: "2c8b7198563527e524d66628c092ef1f"
            },

          "ABUDHABISP_2": {
                url: "https://uselector.cdn.intigral-ott.net/ADSP2/ADSP2.isml/manifest.mpd",
                k1: "efca93272b9d34f5cf9d8598f43be5ea",
                k2: "55e5fe489e9c18f6c979c3126d4bcfed"
            },
            "VSPORTS_PRE": {
                url: "https://cors-proxy.cooks.fyi/https://director.streaming.telia.com/tvm-packager-prod/group1/60896c3647a23d7f115cd57a/manifest.mpd",
                k1: "eab13e69793756eda77d8d71fda90d5d",
                k2: "cd022e9bffa6a0d1523ee5d9fcda9ed4"
            },

           "VSPORTS_PLUS": {
                url: "https://rikstv-live-scalstrm.telenorcdn.net/live/rikstv/644bb6e81dbc891fd422efa2/manifest.mpd",
                k1: "49f577002aa550a8b8f419b4a507458f",
                k2: "46da47eebf5416828f9e005683c6546e"
            },
            "VSPORTS_1_NO": {
                url: "https://rikstv-live-scalstrm.telenorcdn.net/live/rikstv/644bb6e91dbc891fd422efc9/manifest.mpd",
                k1: "4d808f2b9a74536cadbd95be141888ed",
                k2: "9dd89f67b8885dc65721a8b1fbeae700"
            },
            "VSPORTS_2_NO": {
                url: "https://rikstv-live-scalstrm.telenorcdn.net/live/rikstv/644bb6e91dbc891fd422efef/manifest.mpd",
                k1: "0d3ff38c34985fdd81a37567646322b9",
                k2: "6b4504297769acefae2e50920b7c8a77"
            },
            "VSPORTS_3_NO": {
                url: "https://rikstv-live-scalstrm.telenorcdn.net/live/rikstv/644bb6ea1dbc891fd422f01e/manifest.mpd",
                k1: "fdcb8ee4623458e5832a92801fc723b1",
                k2: "634a67c44b7b7030872043df95c1a55e"
            },
            "ESPN4_CO": {
                url: "https://1279247418.rsc.cdn77.org/bpk-tv/QESPNETV/dash/manifest.mpd",
                k1: "2afaf4988ad844b7a262b8df5b705e33",
                k2: "07172c8a508da3beba6f05c9061db8f5"
            },
            "TNT_EN": {
                url: "https://1227-vos.dtvott.com/DASH/manifest.mpd",
                k1: "6f7d75c1b4bb3d28b1b21c50383c0fb6",
                k2: "7b6068b6dc0f82d1a8bf93c84f970316"
            },
            "NBC_US": {
                url: "https://fsly.stream.peacocktv.com/Content/CMAF_OL1-CTR-4s/Live/channel(knbc)/master.mpd",
                k1: "0045a118e231f1326bcdb45350b1ceaa",
                k2: "8c13afbfa54ea37a368b8b859021f6e3"
            },
            "DAS_ERSTE": {
                url: "https://p7s1-live-001-prod.akamaized.net/28df258a/t_009/daserste-de-hd/cenc-default.mpd",
                k1: "667f821486adfa6df62b53e41fe60c65",
                k2: "be65cc2c378180153cbac97bc6ab8625"
            },
            "SPORT1_CZ": {
                url: "https://dash2.antik.sk/stream/nvidia_sport_1/playlist_cbcs.mpd",
                k1: "11223344556677889900112233445566",
                k2: "11223344556677889900112233445566"
            },
            "ZDF_DE": {
                url: "https://p7s1-live-001-prod.akamaized.net/45371d5a/t_009/zdf-de-hd/cenc-default.mpd",
                k1: "7757d3fa8cdab673a2dd9f3ed7b41360",
                k2: "96e498b70eeecfc0164ed4e0a78e36f3"
            },

    };

    var sources = [];

    // If 'id' is present, use ConfiguracionCanales for streaming
    if (id && ConfiguracionCanales[id]) {
        var config = ConfiguracionCanales[id];
        if (config.url.includes('.m3u8')) {
            sources.push({ file: config.url });
        }
        if (config.url.includes('.mpd') && config.k1 && config.k2) {
            sources.push({
                file: config.url,
                drm: { "clearkey": { "keyId": config.k1, "key": config.k2 } }
            });
        }
    }

    // If 'url' is present, add it as a source (HLS)
    if (dynamicUrl) {
        sources.push({ file: dynamicUrl, type: "hls" });
    }

    // If 'dash', 'key', and 'key2' are present, set up DASH playback
    if (dash && key && key2) {
        sources.push({
            file: atob(dash),
            drm: {
                "clearkey": { "keyId": atob(key), "key": atob(key2) }
            },
            label: "DASH"
        });
    }

    // If 'stream' is present, add MP4 source
    if (stream) {
        sources.push({
            file: stream,
            type: "mp4",
            label: "MP4",
        });
    }

    // Setup JWPlayer only if we have sources
    if (sources.length > 0) {
        jwplayer("player").setup({
            playlist: [{
                image: "https://i.ibb.co/0m0WR1M/20240817-205920.png",
                title: "11s.in",
                description: "Join our whatsapp for more links",
                sources: sources
            }],
            logo: {
                file: "https://i.ibb.co/0m0WR1M/20240817-205920.png",
                link: "https://chat.whatsapp.com/GFzG1MzJkDyFYxwPejEQXc",
                hide: false,
                position: "top-right"
            },
            autostart: aut,
            width: "100%",
            height: "100vh",
            cast: {},
            sharing: {}
        });

        // Custom CSS for JWPlayer
        var style = document.createElement('style');
        style.innerHTML = `
            .jw-logo {
                height: 15% !important;
                width: 15% !important;
                margin-right: 10% !important;
                margin-top: 3% !important;
            }
        `;
        document.head.appendChild(style);

        jwplayer("player").on("play", function (e) {
            jwplayer("player").setCurrentAudioTrack(1);
        });

        

 

    </script>
  `;

  // Inject before </body>
  html = html.replace("</body>", `${injectedScript}</body>`);

  res.send(html);
});

app.use((req, res) => {
  res.status(404).send('Currently not found...try again later');
});
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
