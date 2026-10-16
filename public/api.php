<?php
// api.php - Backend API for cPanel / PHP hosting to persist database changes live
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$dataFile = __DIR__ . '/data.json';
$uploadDir = __DIR__ . '/download';

// Ensure upload directory exists
if (!file_exists($uploadDir)) {
    @mkdir($uploadDir, 0777, true);
}

// GET request: fetch current saved data
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (file_exists($dataFile)) {
        $content = file_get_contents($dataFile);
        echo $content;
    } else {
        echo json_encode([
            'status' => 'empty',
            'message' => 'No data file found yet.'
        ], JSON_UNESCAPED_UNICODE);
    }
    exit();
}

// POST request: save updated data, upload images, or append single order message
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Check if it's a multipart file upload
    if (isset($_FILES['file']) || isset($_FILES['image'])) {
        $file = isset($_FILES['file']) ? $_FILES['file'] : $_FILES['image'];
        
        if ($file['error'] === UPLOAD_ERR_OK) {
            $ext = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
            $allowedExts = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'ico'];
            if (!in_array($ext, $allowedExts)) {
                $ext = 'png';
            }
            
            $safeName = 'img_' . time() . '_' . substr(md5(uniqid()), 0, 6) . '.' . $ext;
            $targetPath = $uploadDir . '/' . $safeName;
            
            if (move_uploaded_file($file['tmp_name'], $targetPath)) {
                echo json_encode([
                    'status' => 'success',
                    'message' => 'تصویر با موفقیت در پوشه download آپلود شد',
                    'url' => 'download/' . $safeName,
                    'filename' => $safeName
                ], JSON_UNESCAPED_UNICODE);
            } else {
                http_response_code(500);
                echo json_encode([
                    'status' => 'error',
                    'message' => 'خطا در ذخیره‌سازی فایل در پوشه download روی سرور'
                ], JSON_UNESCAPED_UNICODE);
            }
        } else {
            http_response_code(400);
            echo json_encode([
                'status' => 'error',
                'message' => 'خطا در دریافت فایل ارسالی'
            ], JSON_UNESCAPED_UNICODE);
        }
        exit();
    }

    $rawInput = file_get_contents('php://input');
    $decoded = json_decode($rawInput, true);

    if ($decoded) {
        // Case 1: Base64 Image Upload
        if (isset($decoded['action']) && $decoded['action'] === 'upload_image' && isset($decoded['fileData'])) {
            $fileData = $decoded['fileData'];
            $ext = 'png';
            
            if (preg_match('/^data:image\/(\w+);base64,/', $fileData, $type)) {
                $fileData = substr($fileData, strpos($fileData, ',') + 1);
                $ext = strtolower($type[1]);
                if ($ext === 'jpeg') $ext = 'jpg';
            }
            
            $fileData = base64_decode($fileData);
            if ($fileData === false) {
                http_response_code(400);
                echo json_encode([
                    'status' => 'error',
                    'message' => 'داده تصویر Base64 نامعتبر است'
                ], JSON_UNESCAPED_UNICODE);
                exit();
            }
            
            $safeName = 'img_' . time() . '_' . substr(md5(uniqid()), 0, 6) . '.' . $ext;
            $targetPath = $uploadDir . '/' . $safeName;
            
            if (file_put_contents($targetPath, $fileData) !== false) {
                echo json_encode([
                    'status' => 'success',
                    'message' => 'تصویر با موفقیت در پوشه download آپلود شد',
                    'url' => 'download/' . $safeName,
                    'filename' => $safeName
                ], JSON_UNESCAPED_UNICODE);
            } else {
                http_response_code(500);
                echo json_encode([
                    'status' => 'error',
                    'message' => 'خطا در ذخیره‌سازی تصویر در پوشه download'
                ], JSON_UNESCAPED_UNICODE);
            }
            exit();
        }

        // Case 2: Visitor submitting a single order message from contact form
        if (isset($decoded['action']) && $decoded['action'] === 'add_order_message' && isset($decoded['message'])) {
            $currentData = [];
            if (file_exists($dataFile)) {
                $existingContent = file_get_contents($dataFile);
                $currentData = json_decode($existingContent, true) ?: [];
            }
            if (!isset($currentData['orderMessages']) || !is_array($currentData['orderMessages'])) {
                $currentData['orderMessages'] = [];
            }
            // Prepend new message
            array_unshift($currentData['orderMessages'], $decoded['message']);
            $currentData['updatedAt'] = date('c');

            $saved = file_put_contents($dataFile, json_encode($currentData, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
            if ($saved !== false) {
                echo json_encode([
                    'status' => 'success',
                    'message' => 'پیام با موفقیت در سرور ثبت شد.'
                ], JSON_UNESCAPED_UNICODE);
            } else {
                http_response_code(500);
                echo json_encode([
                    'status' => 'error',
                    'message' => 'خطا در ذخیره پیام روی سرور'
                ], JSON_UNESCAPED_UNICODE);
            }
            exit();
        }

        // Case 2: Full payload save from admin panel
        $saved = file_put_contents($dataFile, json_encode($decoded, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
        if ($saved !== false) {
            echo json_encode([
                'status' => 'success',
                'message' => 'اطلاعات با موفقیت در فایل data.json هاست cPanel ذخیره شد.'
            ], JSON_UNESCAPED_UNICODE);
        } else {
            http_response_code(500);
            echo json_encode([
                'status' => 'error',
                'message' => 'خطا در مجوز دسترسی یا نوشتن فایل روی سرور cPanel'
            ], JSON_UNESCAPED_UNICODE);
        }
    } else {
        http_response_code(400);
        echo json_encode([
            'status' => 'error',
            'message' => 'داده ارسال شده فرمت JSON معتبر ندارد'
        ], JSON_UNESCAPED_UNICODE);
    }
    exit();
}

