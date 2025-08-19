import {
    BookOpenIcon,
    ChatBubbleLeftIcon,
    DocumentTextIcon,
    PencilIcon,
    PhoneIcon,
    SpeakerWaveIcon
} from '@heroicons/react/24/outline';

export const RubricModels = [
    {
        id: '5490761e-2154-4515-86c0-20030736eb7d',
        name: 'IELTS Task 2',
        app_key: {
            grading: 'app-QotKh7WQlARyuu0F5iX1o4Iu',
            general_context: 'app-68Uno2TRLffJqn2a81tPUdwX'
        },
        value: 'app-QotKh7WQlARyuu0F5iX1o4Iu'
    },
    {
        id: '6f84ee60-8edf-45f4-86d8-5229cba364c6',
        name: 'JAE Writing',
        app_key: {
            // grading: 'app-O6UkjFAkDLorCT38twvTJASB',
            grading: 'app-Myb7mMbtRh9cewIcm3wk5xTy',
            general_context: 'app-68Uno2TRLffJqn2a81tPUdwX'
        },
        // value: 'app-O6UkjFAkDLorCT38twvTJASB'
        value: 'app-Myb7mMbtRh9cewIcm3wk5xTy'
    },
    {
        id: '1b5decd5-6d0d-4b95-929a-ed505f4070ee',
        name: 'Speaking Essay', //AI Speaking Checker
        app_key: {
            grading: 'app-xZwhCf7uAU1QHkBP8MYOfR3f',
            general_context: ''
        },
        value: 'app-xZwhCf7uAU1QHkBP8MYOfR3f'
    },
    {
        id: '6196206d-c985-41b4-a74c-675f3e480f76',
        name: 'Speaking Conversation', //AI Conversation Checker
        app_key: {
            grading: 'app-TyhQ2HkqIj6zFk3WwbqEMcPg',
            general_context: ''
        },
        value: 'app-TyhQ2HkqIj6zFk3WwbqEMcPg'
    },
    {
        id: '222-c985-41b4-a74c-675f3e480f76',
        name: 'Sentence Builder', //Sentence Building
        app_key: {
            grading: 'app-eAeKju2JOvJv6erC5nn2OOBy',
            general_context: ''
        },
        value: 'app-eAeKju2JOvJv6erC5nn2OOBy'
    }
];

export const EssayGradingRubricModels = [
    {
        id: '5490761e-2154-4515-86c0-20030736eb7d',
        name: 'IELTS Task 2',
        app_key: {
            grading: 'app-QotKh7WQlARyuu0F5iX1o4Iu',
            general_context: 'app-68Uno2TRLffJqn2a81tPUdwX'
        },
        value: 'app-QotKh7WQlARyuu0F5iX1o4Iu'
    },
    {
        id: '6f84ee60-8edf-45f4-86d8-5229cba364c6',
        name: 'JAE Writing',
        app_key: {
            // grading: 'app-O6UkjFAkDLorCT38twvTJASB',
            grading: 'app-Myb7mMbtRh9cewIcm3wk5xTy',
            general_context: 'app-68Uno2TRLffJqn2a81tPUdwX'
        },
        // value: 'app-O6UkjFAkDLorCT38twvTJASB'
        value: 'app-Myb7mMbtRh9cewIcm3wk5xTy'
    }
];

export const SpeakingEssayRubricModels = [
    {
        id: '1b5decd5-6d0d-4b95-929a-ed505f4070ee',
        name: 'Speaking Essay', //AI Speaking Checker
        app_key: {
            grading: 'app-xZwhCf7uAU1QHkBP8MYOfR3f',
            general_context: 'app-h8iCAuXjsuTNdRpCl8bgKCXo'
        },
        value: 'app-xZwhCf7uAU1QHkBP8MYOfR3f'
    }
];

export const SpeakingConversationRubricModels = [
    {
        id: '6196206d-c985-41b4-a74c-675f3e480f76',
        name: 'Speaking Conversation', //AI Conversation Checker
        app_key: {
            grading: 'app-TyhQ2HkqIj6zFk3WwbqEMcPg',
            general_context: 'app-F2YXRe8VVDfzHPpvzcDica82'
        },
        value: 'app-TyhQ2HkqIj6zFk3WwbqEMcPg'
    }
];

export const SentenceBuildingRubricModels = [
    {
        id: '6196206d-c985-41b4-a74c-675f3e480f76',
        name: 'Sentence Builder (Intermediate)', //Sentence Building Intermediate
        app_key: {
            grading: 'app-eAeKju2JOvJv6erC5nn2OOBy',
            general_context: '',
            vocab_key: 'app-tvPNSvp2g0WWcIqXYQXMzImT'
        },
        value: 'app-eAeKju2JOvJv6erC5nn2OOBy'
    },
    {
        id: '6196206d-eAeKju2JOvJv6erC5nn2OOBy',
        name: 'Sentence Builder (Advanced)', //Sentence Building Advanced
        app_key: {
            grading: 'app-eAeKju2JOvJv6erC5nn2OOBy',
            general_context: '',
            vocab_key: 'app-csUXOsjmuOQv2kf0fdO09AYC'
        },
        value: 'app-eAeKju2JOvJv6erC5nn2OOBy2'
    }
];

export const CategoryModels = [
    {
        name: 'Essay Grading',
        description: 'Create essays and get AI feedback for improved writing',
        value: 'essay',
        icon: <BookOpenIcon className="w-4 h-4" />
    },
    {
        name: 'Sentence Builder',
        description: 'Create descriptive sentences by combining word clusters.',
        value: 'sentence_builder',
        icon: <PencilIcon className="w-4 h-4" />
    },
    {
        name: 'Comprehension',
        description: 'Select news passages for reading comprehension assessments.',
        value: 'comprehension',
        icon: <DocumentTextIcon className="w-4 h-4" />
    },
    {
        name: 'Speaking Essay',
        description: 'Assign spoken essays and receive AI feedback on performance.',
        value: 'speaking_essay',
        icon: <PhoneIcon className="w-4 h-4" />
    },
    {
        name: 'Speaking Conversation',
        description: 'Set topics for AI-driven conversations to enhance speaking skills.',
        value: 'speaking_conversation',
        icon: <ChatBubbleLeftIcon className="w-4 h-4" />
    },
    {
        name: 'Speaking Pronunciation',
        description: 'Practice pronunciation with AI feedback on spoken words.',
        value: 'speaking_pronunciation',
        icon: <SpeakerWaveIcon className="w-4 h-4" />
    }
];

export const ReportHtmlContent = {
    title: '報告Report',
    htmlCode: `<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Dashboard Admin Template by Tooplate.com</title>
        <style>
        html {
            font-size: 17px;
        }
    
        body {
            font-family: "Open Sans", Helvetica, Arial, sans-serif;
            overflow-x: hidden;
        }
    
        body {
            /* background-image: url(../img/dash-bg-01.jpg); */
            /* background-size: cover;
            background-repeat: no-repeat;
            background-position: center;
            background-attachment: fixed;
            padding-left: 50px;
            padding-right: 50px;
    
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
            font-size: 1rem;
            font-weight: 400;
            line-height: 1.5;
            color: #212529;
            text-align: left; */
        }
    
        a {
            transition: all 0.3s ease;
        }
    
        a:hover,
        a:focus {
            text-decoration: none;
        }
    
        h2 {
            margin: 0px;
            padding: 0px;
        }
    
        .navbar-brand {
            display: flex;
            align-items: center;
        }
    
        .tm-site-icon {
            color: #656565;
        }
    
        .tm-site-title {
            display: inline-block;
            text-transform: uppercase;
            font-size: 2rem;
            margin-left: 1rem;
            color: #656565;
            letter-spacing: 1px;
        }
    
        .navbar {
            height: 100px;
            padding-left: 20px;
            padding-right: 20px;
            margin-top: 50px;
        }
    
        .tm-logout-icon {
            font-size: 1.5em;
        }
    
        .tm-bg-black {
            background-color: rgba(0, 0, 0, 0.5);
        }
    
        .tm-mt-big {
            /* margin-top: 70px; */
        }
    
        .tm-mt-small {
            margin-top: 20px;
        }
    
        .tm-block {
            padding: 30px 20px;
            min-height: 250px;
        }
    
        .tm-block-title {
            font-size: 1.2rem;
            color: #333;
            margin-bottom: 10px;
        }
    
        .navbar-light .navbar-nav .nav-link {
            color: #656565;
        }
    
        .navbar-light .navbar-nav .nav-link,
        .dropdown-item {
            padding: 15px 20px;
        }
    
        .navbar-light .navbar-nav .active>.nav-link,
        .navbar-light .navbar-nav .nav-link.active,
        .navbar-light .navbar-nav .nav-link.show,
        .navbar-light .navbar-nav .show>.nav-link,
        .navbar-light .navbar-nav a:hover {
            background-color: #e6e6e6;
        }
    
        .nav-item {
            margin-right: 30px;
        }
    
        .nav-item:last-child {
            margin-right: 0;
        }
    
        .tm-content-row {
            justify-content: space-between;
            margin-left: -20px;
            margin-right: -20px;
            /* To offset col padding */
        }
    
        .tm-col {
            padding-left: 20px;
            padding-right: 20px;
            margin-bottom: 50px;
        }
    
        .tm-col-big {
            width: 33.3%;
        }
    
        .tm-col-small {
            width: 21.95%;
        }
    
        .tm-link-black {
            color: black;
        }
    
        .tm-link-black:hover,
        .tm-link-black:focus {
            color: #0266c4;
        }
    
        ol {
            margin-bottom: 0;
        }
    
        .tm-list-group {
            counter-reset: myOrderedListItemsCounter;
            padding-left: 0;
        }
    
        .tm-list-group>li {
            list-style-type: none;
            position: relative;
            cursor: pointer;
            transition: all 0.3s ease;
            padding: 8px;
        }
    
        .tm-list-group-pad-big>li {
            padding: 20px;
        }
    
        .tm-list-group>li:hover {
            color: #0266c4;
        }
    
        .tm-list-group-alternate-color>li:nth-child(odd) {
            background-color: #e6e6e6;
        }
    
        .tm-list-group>li:before {
            counter-increment: myOrderedListItemsCounter;
            content: counter(myOrderedListItemsCounter) ".";
            margin-right: 0.5em;
        }
    
        .tm-list {
            padding-left: 30px;
        }
    
        .tm-list>li {
            margin-bottom: 20px;
        }
    
        .form-control {
            margin-bottom: 23px;
            padding: 19px 18px;
            border-radius: 0;
            height: 50px;
        }
    
        label {
            margin-bottom: 18px;
        }
    
        .btn {
            border-radius: 0;
            padding: 13px 28px;
            transition: all 0.2s ease;
            max-width: 100%;
        }
    
        .btn-small {
            padding: 10px 24px;
        }
    
        .btn-primary {
            background-color: transparent;
            color: black;
            border-color: #999999;
        }
    
        .btn-primary:hover,
        .btn-primary:active,
        .btn-primary:not(:disabled):not(.disabled).active,
        .btn-primary:not(:disabled):not(.disabled):active,
        .show>.btn-primary.dropdown-toggle {
            color: black;
            background-color: #cdd4da;
            border-color: #999999;
        }
    
        .btn-danger {
            color: #9f1321;
            background-color: transparent;
            border-color: #9f1321;
        }
    
        .btn-danger:hover {
            color: #9f1321;
            background-color: rgba(159, 19, 32, 0.27);
            border-color: #9f1321;
        }
    
        .custom-file-input {
            cursor: pointer;
        }
    
        .custom-file-label {
            border-radius: 0;
        }
    
        .tm-btn-right {
            text-align: right;
        }
    
        .table td,
        .table th {
            padding: 20px 24px;
        }
    
        .table-hover tbody tr:hover {
            background-color: white;
            color: #3aabd0;
        }
    
        .tm-bg-gray {
            background-color: rgba(0, 0, 0, 0.05);
        }
    
        .tm-table-striped-even.table-striped tbody tr:nth-of-type(even) {
            background-color: rgba(0, 0, 0, 0.05);
        }
    
        .tm-table-striped-even.table-striped tbody tr:nth-of-type(odd) {
            background-color: white;
        }
    
        .tm-table-mt {
            margin-top: 66px;
        }
    
        .page-item:first-child .page-link {
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
        }
    
        .page-item:last-child .page-link {
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
        }
    
        .page-link,
        .tm-dots {
            padding: 12px 18px;
        }
    
        .page-link,
        .page-link:hover {
            color: black;
        }
    
        .page-item {
            margin-right: 18px;
        }
    
        .page-item:last-child {
            margin-right: 0;
        }
    
        .page-item.active .page-link {
            background-color: #e9ecef;
            border-color: #dee2e6;
            color: black;
        }
    
        .tm-pagination {
            justify-content: flex-end;
        }
    
        .tm-pagination-label {
            padding-bottom: 15px;
            padding-right: 15px;
            display: inline-block;
        }
    
        .tm-table-actions-row {
            display: flex;
            justify-content: space-between;
        }
    
        .tm-table-actions-col-right {
            text-align: right;
        }
    
        input[type="checkbox"] {
            cursor: pointer;
            -webkit-appearance: none;
            appearance: none;
            border: 1px solid black;
            box-sizing: border-box;
            position: relative;
            box-sizing: content-box;
            width: 24px;
            height: 24px;
            transition: all 0.1s linear;
        }
    
        input[type="checkbox"]:checked {
            background-color: #9f1321;
        }
    
        input[type="checkbox"]:focus {
            outline: 0 none;
            box-shadow: none;
        }
    
        .tm-trash-icon {
            color: #6e6c6c;
            cursor: pointer;
        }
    
        .tm-trash-icon:hover {
            color: #9f1321;
        }
    
        .tm-trash-icon-cell {
            width: 15px;
        }
    
        footer {
            margin-bottom: 35px;
        }
    
        .custom-select {
            height: 50px;
            border-radius: 0;
        }
    
        .tm-product-img-dummy {
            max-width: 100%;
            width: 240px;
            height: 240px;
            border: 1px solid #cccccc;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #c8c8c8;
        }
    
        .tm-login-col {
            max-width: 600px;
        }
    
        .col-12 {
            -ms-flex: 0 0 100%;
            flex: 0 0 100%;
            max-width: 100%;
        }
    
        .col,
        .col-1,
        .col-10,
        .col-11,
        .col-12,
        .col-2,
        .col-3,
        .col-4,
        .col-5,
        .col-6,
        .col-7,
        .col-8,
        .col-9,
        .col-auto,
        .col-lg,
        .col-lg-1,
        .col-lg-10,
        .col-lg-11,
        .col-lg-12,
        .col-lg-2,
        .col-lg-3,
        .col-lg-4,
        .col-lg-5,
        .col-lg-6,
        .col-lg-7,
        .col-lg-8,
        .col-lg-9,
        .col-lg-auto,
        .col-md,
        .col-md-1,
        .col-md-10,
        .col-md-11,
        .col-md-12,
        .col-md-2,
        .col-md-3,
        .col-md-4,
        .col-md-5,
        .col-md-6,
        .col-md-7,
        .col-md-8,
        .col-md-9,
        .col-md-auto,
        .col-sm,
        .col-sm-1,
        .col-sm-10,
        .col-sm-11,
        .col-sm-12,
        .col-sm-2,
        .col-sm-3,
        .col-sm-4,
        .col-sm-5,
        .col-sm-6,
        .col-sm-7,
        .col-sm-8,
        .col-sm-9,
        .col-sm-auto,
        .col-xl,
        .col-xl-1,
        .col-xl-10,
        .col-xl-11,
        .col-xl-12,
        .col-xl-2,
        .col-xl-3,
        .col-xl-4,
        .col-xl-5,
        .col-xl-6,
        .col-xl-7,
        .col-xl-8,
        .col-xl-9,
        .col-xl-auto {
            position: relative;
            width: 100%;
            min-height: 1px;
            padding-right: 15px;
            padding-left: 15px;
        }
    
        .row {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-wrap: wrap;
            flex-wrap: wrap;
            margin-right: -15px;
            margin-left: -15px;
            justify-content: left;
        }
    
        .container {
            width: 100%;
            padding-right: 15px;
            padding-left: 15px;
            margin-right: auto;
            margin-left: auto;
        }
    
        .h-100 {
            height: 100% !important;
        }
    
        .bg-white {
            background-color: #fff !important;
        }
    
        p {
            margin-top: 0;
            margin-bottom: 1rem;
        }
    
        dl,
        ol,
        ul {
            margin-top: 0;
            margin-bottom: 1rem;
        }
    
        *,
        ::after,
        ::before {
            box-sizing: border-box;
        }
    
    
        @media (min-width: 768px) {
            .container {
                max-width: 720px;
            }
        }
    
        @media (min-width: 576px) {
    
            /* .container {
                max-width: 540px;
            } */
        }
    
        .container {
            width: 100%;
            padding-right: 15px;
            padding-left: 15px;
            margin-right: auto;
            margin-left: auto;
        }
    
        @media (min-width: 992px) {
            .navbar-expand-lg .navbar-nav .nav-link {
                padding: 15px 20px;
            }
        }
    
        @media (min-width: 1200px) {
            .container {
                max-width: 1630px;
            }
        }
    
        @media (max-width: 1275px) and (min-width: 1200px) {
            .nav-item {
                margin-right: 15px;
            }
        }
    
        @media (max-width: 1350px) and (min-width: 1200px) {
            .tm-table-actions-row {
                display: block;
            }
    
            .tm-table-actions-col-right {
                margin-top: 30px;
            }
        }
    
        @media (max-width: 1350px) {
            .nav-item {
                margin-right: 1px;
            }
        }
    
        @media (max-width: 1199px) {
    
            .tm-col-big,
            .tm-col-small {
                width: 49.65%;
            }
    
            .navbar-collapse {
                background: white;
                padding: 15px;
                box-shadow: rgba(108, 117, 125, 0.27) 0px 1px 1px 0px;
                position: absolute;
                top: 77px;
                right: 20px;
                width: 245px;
                z-index: 1000;
            }
    
            .navbar-nav .nav-link {
                padding-right: 15px;
                padding-left: 15px;
            }
    
            .nav-item {
                margin-right: 0;
            }
        }
    
        @media (max-width: 991px) {
    
            .tm-col-big,
            .tm-col-small {
                width: 100%;
                min-height: 383px;
                height: auto;
            }
    
            .tm-block {
                padding: 30px;
            }
    
            .tm-table-actions-row {
                display: block;
            }
    
            .tm-table-actions-col-right {
                text-align: left;
                margin-top: 30px;
            }
    
            .tm-edit-product-row {
                flex-direction: column-reverse;
            }
        }
    
        @media (max-width: 633px) {
            .pagination {
                flex-wrap: wrap;
            }
    
            .tm-pagination {
                justify-content: flex-start;
            }
    
            .tm-pagination-label {
                display: inline-block;
                margin-right: 0;
            }
    
            .page-item {
                margin-top: 10px;
            }
        }
    
        @media (max-width: 574px) {
            .navbar-collapse {
                top: 70px;
            }
    
            .tm-btn-right {
                text-align: left;
                margin-top: 20px;
            }
    
            .navbar {
                margin-top: 30px;
                height: auto;
            }
    
            body {
                padding-left: 15px;
                padding-right: 15px;
            }
    
            .tm-site-title {
                font-size: 1.4rem;
                margin-left: 7px;
            }
    
            .tm-site-icon {
                font-size: 2em;
            }
        }
    
        @media (max-width: 480px) {
            .tm-mt-big {
                margin-top: 45px;
            }
        }
    
        @media (max-width: 424px) {
            .navbar-collapse {
                top: 107px;
            }
        }
    
        .number {
            /* width: 100px; */
            /* margin: auto; */
        }
    
        .number .text {
            font-size: 1rem;
            /* text-align: center; */
            color: black;
        }
    </style>
    </head>
    
    <body id="reportsPage"
        style="background-image: url('https://img.tukuppt.com/bg_grid/18/36/13/pceXS2trc8.jpg!/fh/350') ;background-repeat: no-repeat;background-size: cover;min-height: 100vh;">
        <div class="" id="home">
            <div class="container" >
                <div class="row">
                    <div class="col-12" style="text-align: center;padding-top: 20px;">
                        <label style="color: white; font-size: 4rem">{{title}}</label>
                    </div>
                </div>
                <!-- row -->
                <div class="row tm-content-row tm-mt-big" style="margin-top: 20px;">
                    {{content}}
                </div>
            </div>
        </div>
    </body>
    </html>`,
    itemCode: `<div class="tm-col tm-col-big">
    <div class="bg-white tm-block h-100">
        <h2 class="tm-block-title">{{subtitle}}</h2>
        <div class="number">
            <label class="text">{{paragraph}}</label>
        </div>
    </div>
</div>`
};

export const ReadReportHtmlContent = {
    title: '報告Report',
    htmlCode: `<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>report</title>
    
        <style>
            html {
                font-size: 16px;
            }
    
            body {
                font-family: "Open Sans", Helvetica, Arial, sans-serif;
                overflow-x: hidden;
            }
    
            a:hover,
            a:focus {
                text-decoration: none;
            }
    
            h2 {
                margin: 0px;
                padding: 0px;
            }
    
            label {
                margin-bottom: 18px;
            }
    
            .container {
                width: 100%;
                padding-right: 15px;
                padding-left: 15px;
                margin-right: auto;
                margin-left: auto;
            }
    
            .h-100 {
                height: 100% !important;
            }
    
            .bg-white {
                background-color: #fff !important;
            }
    
            p {
                margin-top: 0;
                margin-bottom: 1rem;
            }
    
            *,
            ::after,
            ::before {
                box-sizing: border-box;
            }
    
    
            .container {
                width: 100%;
                padding-right: 15px;
                padding-left: 15px;
                margin-right: auto;
                margin-left: auto;
                padding-bottom: 20px;
            }
    
            .tm-block-title {
                font-size: 18px;
            }
    
            .text {
                font-size: 16px;
                margin-top: 5px;
                word-break: break-word;
                white-space: pre-wrap;
            }
        </style>
    </head>
    
    <body>
        <div class="container">
            <div class="row">
                <div class="col-12" style="text-align: center;margin-bottom: 10px">
                    <label style=" font-size: 3rem">{{title}}</label>
                </div>
            </div>
            {{content}}
        </div>
    </body>
    
    </html>`,
    itemCode: `<div style="margin-bottom: 20px;">
    <h2 class="tm-block-title">{{subtitle}}</h2>
    <div class="text">{{paragraph}}</div>
</div>`
};

export const covert = (storyboard_items: []) => {
    let html = '';
    storyboard_items?.map((storyboard_item: any) => {
        const tmp = ReportHtmlContent.itemCode
            .replaceAll('{{subtitle}}', storyboard_item.subtitle)
            .replaceAll('{{paragraph}}', storyboard_item.paragraph);
        html += tmp;
    });
    const content = ReportHtmlContent.htmlCode
        .replaceAll('{{title}}', ReportHtmlContent.title)
        .replaceAll('{{content}}', html);
    return content;
};

export const covertToRead = (storyboard_items: []) => {
    let html = '';
    storyboard_items?.map((storyboard_item: any) => {
        const tmp = ReadReportHtmlContent.itemCode
            .replaceAll('{{subtitle}}', storyboard_item.subtitle)
            .replaceAll('{{paragraph}}', storyboard_item.paragraph);
        html += tmp;
    });
    const content = ReadReportHtmlContent.htmlCode
        .replaceAll('{{title}}', ReadReportHtmlContent.title)
        .replaceAll('{{content}}', html);
    return content;
};
