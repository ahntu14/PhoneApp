package com.hellonative

import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate

class MainActivity : ReactActivity() {
  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  override fun getMainComponentName(): String {
    return "HelloNative" // Replace "YourComponentName" with your actual component name
  }

  override fun onCreate(savedInstanceState: Bundle?) {
      super.onCreate(null);
    }

  override fun createReactActivityDelegate(): ReactActivityDelegate {
      return DefaultReactActivityDelegate(this, getMainComponentName(), fabricEnabled)
  }
}
